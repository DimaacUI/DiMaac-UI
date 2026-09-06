interface LemonSqueezyValidateResponse {
  valid: boolean;
  error?: string | null;
  license_key?: {
    status: string;
    activation_usage: number;
    activation_limit: number | null;
    /** True for keys created while the store was in test mode — never paid for. */
    test_mode?: boolean;
  };
  meta?: {
    store_id: number;
    product_id: number;
    variant_id: number;
    variant_name: string;
    product_name: string;
  };
}

export interface LicenseAccessResult {
  valid: boolean;
  variantId?: number;
  productId?: number;
  productName?: string;
  storeId?: number;
  testMode?: boolean;
  error?: string;
}

/** Test-mode licences are accepted only when LEMONSQUEEZY_ALLOW_TEST_LICENSES=1 (never by default). */
export function allowTestLicenses(): boolean {
  return process.env.LEMONSQUEEZY_ALLOW_TEST_LICENSES === '1';
}

/** Validate a Lemon Squeezy license key (subscription or one-time). */
export async function validateLicenseKey(licenseKey: string): Promise<LicenseAccessResult> {
  const trimmed = licenseKey.trim();
  if (!trimmed) {
    return { valid: false, error: 'License key is required' };
  }

  try {
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ license_key: trimmed }),
    });

    // Lemon Squeezy answers 404 (with a JSON body) for keys it doesn't know,
    // so read the body whenever there is one and only treat a non-JSON reply
    // (outage, gateway error) as "try again later".
    let data: LemonSqueezyValidateResponse | null = null;
    try {
      data = (await response.json()) as LemonSqueezyValidateResponse;
    } catch {
      data = null;
    }

    if (!data) {
      return { valid: false, error: 'Could not validate license. Try again later.' };
    }

    if (!data.valid) {
      return { valid: false, error: data.error ?? 'Invalid license key' };
    }

    // Fresh checkout keys are often valid but status "inactive" until first activation.
    const status = data.license_key?.status;
    if (status === 'disabled' || status === 'expired') {
      return {
        valid: false,
        error: `License is ${status}. An active subscription or purchase is required.`,
      };
    }

    // Test-mode keys validate fine at Lemon Squeezy but were never paid for.
    // Only honour them when explicitly allowed (local testing).
    if (data.license_key?.test_mode && !allowTestLicenses()) {
      return {
        valid: false,
        testMode: true,
        error: 'This is a test-mode license from Lemon Squeezy. Subscribe to DiMaac Pro to get a live key.',
      };
    }

    return {
      valid: true,
      variantId: data.meta?.variant_id,
      productId: data.meta?.product_id,
      productName: data.meta?.product_name,
      storeId: data.meta?.store_id,
      testMode: Boolean(data.license_key?.test_mode),
    };
  } catch {
    return { valid: false, error: 'License validation failed' };
  }
}

/**
 * The Lemon Squeezy product every Pro plan (monthly, yearly, any future
 * variant) belongs to. A licence for this product unlocks all pro templates,
 * so adding a plan in Lemon Squeezy never needs a config change here.
 * Override with LEMONSQUEEZY_PRO_PRODUCT_ID if the product is ever recreated.
 */
const PRO_PRODUCT_NAME = 'DiMaac Pro';

/** A DiMaac Pro licence — by product, or by an explicitly listed variant. */
export function hasSubscriptionAccess(access: Pick<LicenseAccessResult, 'variantId' | 'productId' | 'productName'>): boolean {
  const { variantId, productId, productName } = access;

  const proProductId = process.env.LEMONSQUEEZY_PRO_PRODUCT_ID?.trim();
  if (proProductId && productId !== undefined && String(productId) === proProductId) {
    return true;
  }
  if (!proProductId && productName?.trim() === PRO_PRODUCT_NAME) {
    return true;
  }

  if (!variantId) return false;

  const subscriptionVariantId = process.env.LEMONSQUEEZY_SUBSCRIPTION_VARIANT_ID;
  const subscriptionVariantIds = process.env.LEMONSQUEEZY_SUBSCRIPTION_VARIANT_IDS?.split(',').map((id) => id.trim());

  if (subscriptionVariantId && String(variantId) === subscriptionVariantId) {
    return true;
  }

  if (subscriptionVariantIds?.includes(String(variantId))) {
    return true;
  }

  return false;
}

export function hasTemplatePurchaseAccess(): boolean {
  return false;
}

export function canDownloadTemplate(access: LicenseAccessResult): boolean {
  if (!access.valid) return false;
  return hasSubscriptionAccess(access);
}
