import { TaxData } from "../types/taxTypes";

/**
 * Payload to fetch all taxes.
 */
export const fetchTaxesPayload = () => {
  return {};
};

/**
 * Payload to add a new tax.
 * @param taxName The name of the tax.
 * @param taxCode The short code of the tax.
 * @param active The active status of the tax.
 */
export const addTaxPayload = (taxName: string, taxCode: string, active: boolean) => {
  return {
    taxName,
    taxCode,
    active,
  };
};

/**
 * Payload to update an existing tax.
 * @param data The tax data to be updated.
 */
export const updateTaxPayload = (data: TaxData) => {
  return {
    srl: data.srl,
    taxName: data.taxName,
    taxCode: data.taxCode,
    active: data.active,
  };
};

/**
 * Payload to delete a single tax.
 * @param srl The serial number of the tax to delete.
 */
export const deleteTaxPayload = (srl: number) => {
  return {
    srl,
  };
};

/**
 * Payload to delete multiple taxes.
 * @param srls An array of serial numbers of taxes to delete.
 */
export const deleteMultipleTaxesPayload = (srls: number[]) => {
  return {
    srls,
  };
};
