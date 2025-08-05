// IMPORTS

const { test, expect } = require('@playwright/test');
require('dotenv').config(); 

test.beforeEach(async ({ page }) => {

  // Define the base URL of the application for the UI
  await page.setViewportSize({ width: 1920, height: 1080 });
  const appURL = `${process.env.BASE_URL}/#/auth/login`;

  // Navigate to the login page and validate it
  await page.goto(appURL); 
  await expect(page).toHaveTitle('Qubika Club');
  await expect(page.getByRole('button', { name: 'Autenticar' })).toBeVisible();

  // Log in with test user credentials
  await page.locator('[formcontrolname="email"]').fill(process.env.TEST_EMAIL);
  await page.locator('[formcontrolname="password"]').fill(process.env.TEST_PASSWORD);
  await page.getByRole('button', { name: 'Autenticar' }).click();
  
  // Validate that the login was successful
  await page.waitForURL(/dashboard/);
  await expect(page.locator('.nav-link:has-text("Salir")')).toBeVisible();
  //console.log('Successfully logged in to the Qubika Sports Club management.');
});

// TESTS

test('should create a new Category and SubCategory', async ({ page }) => {
  console.log('Successfully logged in to the Qubika Sports Club management.');

  // Go to the Category page
  await page.locator('.nav-link:has-text("Tipos de Categorias")').click();
  await page.waitForURL(/category-type/);
  await expect(page.getByRole('heading', { name: 'Tipos de categorías' })).toBeVisible();
  console.log('Successfully navigated to the Category page.');

  // Create a new Category 
  const categoryName = `Cat_JALR_${Date.now()}`; // Dynamic Cat Name
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await expect(page.getByRole('heading', { name: 'Adicionar tipo de categoría' })).toBeVisible();
  await page.getByPlaceholder('Nombre de categoría').fill(categoryName);
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await expect(page.getByText('Tipo de categoría adicionada satisfactoriamente')).toBeVisible();

  // Validate Category creation
  await expect(page.getByRole('heading', { name: 'Tipos de categorías' })).toBeVisible();
  await page.locator('.pagination .page-link').nth(-2).click();
  await expect(page.getByRole('cell', { name: categoryName })).toBeVisible(); // Validate the presence of the category in the table
  console.log(`Successfully created Category: ${categoryName}`);

  // Create a Sub Category
  const subCategoryName = `Sub-Cat_JALR_${Date.now()}`; // Dynamic Sub-Cat Name
  await page.getByRole('button', { name: 'Adicionar' }).click();
  await expect(page.getByRole('heading', { name: 'Adicionar tipo de categoría' })).toBeVisible();
  await page.getByText('Es subcategoria?').click();
  await page.getByPlaceholder('Nombre de categoría').fill(subCategoryName);
  await page.getByPlaceholder('Seleccione la categoría padre').click();
  await page.locator(`.ng-option-label:has-text("${categoryName}")`).click();
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.waitForLoadState('networkidle');

  // Validate Category creation
  await expect(page.getByText('Tipo de categoría adicionada satisfactoriamente')).toBeVisible();
  await expect(page.getByRole('cell', { name: subCategoryName })).toBeVisible();
  console.log(`Successfully created Sub-Category: ${subCategoryName} on Category: ${categoryName}`);
});