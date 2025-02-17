import { Page, expect } from '@playwright/test';

export async function checkAriaSnapshot(page: Page, snapshotName: string) {
  await expect(page.locator('body')).toMatchAriaSnapshot(snapshotName);
}