import React, { createContext, useContext, useState, useEffect } from "react";
import { getTaxes, addTax, updateTax, deleteTax, deleteMultipleTaxes } from "../services/api";
import { TaxData } from "../types/taxTypes";

interface TaxContextType {
  taxData: TaxData[];
  addTax: (taxName: string, taxCode: string, active: boolean) => Promise<void>;
  editTax: (updatedData: TaxData) => Promise<void>;
  deleteTax: (srl: number) => Promise<void>;
  deleteChecked: (selectedRows: number[]) => Promise<void>;
}

const TaxContext = createContext<TaxContextType | null>(null);

export const TaxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taxData, setTaxData] = useState<TaxData[]>([]);

  useEffect(() => {
    fetchTaxData();
  }, []);

  const fetchTaxData = async () => {
    try {
      const response = await getTaxes();
      setTaxData(response.data);
    } catch (error) {
      console.error('Failed to fetch tax data', error);
    }
  };

  const addTax = async (taxName: string, taxCode: string, active: boolean) => {
    try {
      const response = await addTax(taxName, taxCode, active);
      setTaxData((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Failed to add tax', error);
    }
  };

  const editTax = async (updatedData: TaxData) => {
    try {
      await updateTax(updatedData);
      setTaxData((prev) =>
        prev.map((item) => (item.srl === updatedData.srl ? updatedData : item))
      );
    } catch (error) {
      console.error('Failed to update tax', error);
    }
  };

  const deleteTax = async (srl: number) => {
    try {
      await deleteTax(srl);
      setTaxData((prev) => prev.filter((item) => item.srl !== srl));
    } catch (error) {
      console.error('Failed to delete tax', error);
    }
  };

  const deleteChecked = async (selectedRows: number[]) => {
    try {
      await deleteMultipleTaxes(selectedRows);
      setTaxData((prev) => prev.filter((item) => !selectedRows.includes(item.srl)));
    } catch (error) {
      console.error('Failed to delete multiple taxes', error);
    }
  };

  return (
    <TaxContext.Provider value={{ taxData, addTax, editTax, deleteTax, deleteChecked }}>
      {children}
    </TaxContext.Provider>
  );
};

export const useTaxContext = () => useContext(TaxContext);
