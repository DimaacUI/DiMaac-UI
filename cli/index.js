#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const https = require('https');

const API_BASE = 'https://ui.dimaac.com/api';
const REGISTRY_URL = `${API_BASE}/components`;

program
  .name('dimaac')
  .description('Add DiMaac UI components to your projects')
  .version('1.0.2');

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

function fetchRegistry() {
  return new Promise((resolve, reject) => {
    https.get(REGISTRY_URL, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const registry = JSON.parse(data);
          if (registry.success) {
            resolve(registry.components);
          } else {
            reject(new Error('Failed to fetch component registry'));
          }
        } catch (error) {
          reject(new Error('Invalid registry response'));
        }
      });
    }).on('error', reject);
  });
}

// Convert slug (post-swiper) to PascalCase (PostSwiper) for matching
function slugToPascal(slug) {
  if (!slug || typeof slug !== 'string') return slug;
  return slug
    .split(/[-_\s]+/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

async function findComponent(componentName, registry) {
  if (!componentName) return null;

  // Try exact match first
  for (const [category, components] of Object.entries(registry)) {
    const component = components.find(comp => comp.name === componentName);
    if (component) return { category, component };
  }

  // Try case-insensitive match
  const nameLower = componentName.toLowerCase();
  for (const [category, components] of Object.entries(registry)) {
    const component = components.find(
      comp => comp.name.toLowerCase() === nameLower
    );
    if (component) return { category, component };
  }

  // Try slug-to-PascalCase (e.g. post-swiper -> PostSwiper)
  const pascalName = slugToPascal(componentName);
  if (pascalName !== componentName) {
    for (const [category, components] of Object.entries(registry)) {
      const component = components.find(comp => comp.name === pascalName);
      if (component) return { category, component };
    }
  }

  return null;
}

async function installComponent(componentName, includeExample = false) {
  try {
    console.log('📦 Fetching latest component registry...');
    const registry = await fetchRegistry();

    const result = await findComponent(componentName, registry);

    if (!result) {
      console.error(`Component "${componentName}" not found.`);
      console.log('\n📦 Available components:');
      Object.entries(registry).forEach(([category, components]) => {
        console.log(`\n  ${category.toUpperCase()}:`);
        components.forEach(comp => console.log(`    - ${comp.name} (${comp.description})`));
      });
      return;
    }

    const { category, component } = result;
    const componentDir = path.join(process.cwd(), 'ui', 'components');
    ensureDirectoryExists(componentDir);

    const destination = path.join(componentDir, `${component.name}.tsx`);

    console.log(`⬇️  Downloading ${component.name}...`);
    await downloadFile(component.sourceUrl, destination);
    console.log(`✅ Successfully installed ${component.name} to ui/components/`);

    if (includeExample && component.exampleUrl) {
      const exampleDir = path.join(process.cwd(), 'examples');
      ensureDirectoryExists(exampleDir);

      const exampleDestination = path.join(exampleDir, `${component.name}Demo.tsx`);

      try {
        console.log(`⬇️  Downloading example...`);
        await downloadFile(component.exampleUrl, exampleDestination);
        console.log(`✅ Successfully installed ${component.name}Demo to examples/`);
      } catch (error) {
        console.log(`⚠️  Example not found for ${component.name}`);
      }
    }

    if (component.dependencies && component.dependencies.length > 0) {
      console.log(`\n📋 Required dependencies:`);
      component.dependencies.forEach(dep => console.log(`  - ${dep}`));
      console.log(`\nInstall with: npm install ${component.dependencies.join(' ')}`);
    }

  } catch (error) {
    console.error(`❌ Failed to install ${componentName}:`, error.message);
    console.log('\n💡 Make sure you have an internet connection and try again.');
  }
}

program
  .command('init')
  .description('Initialize DiMaac UI in your project')
  .action(async () => {
    console.log('🚀 Initializing DiMaac UI...');

    const uiDir = path.join(process.cwd(), 'ui');
    const componentsDir = path.join(process.cwd(), 'ui', 'components');
    ensureDirectoryExists(componentsDir);

    console.log('✅ Created ui/components directory');
    console.log('📦 DiMaac UI initialized successfully!');
    console.log('\nNext steps:');
    console.log('  npx dimaac add [component]');
    console.log('  npx dimaac add MouseTiltCard');
    console.log('  npx dimaac add MouseTiltCard -e');
  });

program
  .command('add')
  .description('Add a component to your project')
  .argument('[component]', 'Component name')
  .option('-e, --example', 'Include example/demo file')
  .option('--all', 'Install all components')
  .action(async (component, options) => {
    if (options.all) {
      try {
        console.log('📦 Fetching latest component registry...');
        const registry = await fetchRegistry();

        console.log('Installing all components...');
        for (const [category, components] of Object.entries(registry)) {
          for (const comp of components) {
            await installComponent(comp.name, options.example);
          }
        }
      } catch (error) {
        console.error('❌ Failed to fetch component registry:', error.message);
      }
      return;
    }

    if (!component) {
      try {
        console.log('📦 Fetching latest component registry...');
        const registry = await fetchRegistry();

        console.log('\n📦 Available Components:');
        Object.entries(registry).forEach(([category, components]) => {
          console.log(`\n  ${category.toUpperCase()}:`);
          components.forEach(comp => console.log(`    - ${comp.name} (${comp.description})`));
        });
        console.log('\nUsage: npx dimaac add [component]');
        console.log('Example: npx dimaac add MouseTiltCard');
        console.log('Add -e flag to include example: npx dimaac add MouseTiltCard -e');
      } catch (error) {
        console.error('❌ Failed to fetch component registry:', error.message);
      }
      return;
    }

    await installComponent(component, options.example);
  });

program
  .command('list')
  .description('List all available components')
  .action(async () => {
    try {
      console.log('📦 Fetching latest component registry...');
      const registry = await fetchRegistry();

      console.log('\n📦 Available Components:');
      Object.entries(registry).forEach(([category, components]) => {
        console.log(`\n  ${category.toUpperCase()}:`);
        components.forEach(comp => console.log(`    - ${comp.name} (${comp.description})`));
      });
      console.log('\nUsage: npx dimaac add [component] [-e]');
      console.log('Add -e flag to include example/demo files');
    } catch (error) {
      console.error('❌ Failed to fetch component registry:', error.message);
    }
  });

program.parse();