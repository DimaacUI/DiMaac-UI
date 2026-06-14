interface LemonSqueezyValidateResponse {
  valid: boolean;
  error?: string | null;
  license_key?: {
    status: string;
    activation_usage: number;
    activation_limit: number;
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
  error?: string;
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

    if (!response.ok) {
      return { valid: false, error: 'Could not validate license. Try again later.' };
    }

    const data = (await response.json()) as LemonSqueezyValidateResponse;

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

    return {
      valid: true,
      variantId: data.meta?.variant_id,
    };
  } catch {
    return { valid: false, error: 'License validation failed' };
  }
}

/** Subscription variant grants access to all pro templates. */
export function hasSubscriptionAccess(variantId: number | undefined): boolean {
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
  return hasSubscriptionAccess(access.variantId);
}
