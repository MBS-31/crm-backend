import { apiFetch } from "./apiClient";
import { mockCustomers } from "@/data/mockData";
import { Customer } from "@/types";

export const customersService = {
  getAll: async (): Promise<Customer[]> => {
    return apiFetch<Customer[]>("/customers", {}, mockCustomers);
  },
  getById: async (id: string): Promise<Customer | undefined> => {
    const fallback = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
    return apiFetch<Customer>(`/customers/${id}`, {}, fallback);
  },
  updateHealth: async (id: string, healthScore: number): Promise<Customer> => {
    const cust = mockCustomers.find((c) => c.id === id) || mockCustomers[0];
    const updated = { ...cust, healthScore };
    return apiFetch<Customer>(
      `/customers/${id}/health`,
      { method: "PATCH", body: JSON.stringify({ healthScore }) },
      updated
    );
  },
  create: async (data: Partial<Customer>): Promise<Customer> => {
    const newCust: Customer = {
      id: `cust_${Date.now()}`,
      name: data.name || "New Customer",
      company: data.company || "Company Ltd",
      email: data.email || "contact@domain.com",
      phone: data.phone || "+91 99999 88888",
      arr: data.arr || 3000000,
      healthScore: 85,
      sentiment: "Positive",
      churnRisk: "Low",
      healthCategory: "Healthy",
      nextBestAction: "Schedule initial onboarding sync",
      stage: "Onboarding",
      assignedRep: "Rahul Sharma",
      joinedDate: "Today",
      lastContact: "Just now",
      tags: ["New"],
      relationships: {
        deals: 1,
        emails: 2,
        whatsapp: 5,
        calls: 1,
        tasks: 2,
        documents: 1,
      },
      ...data,
    };
    return apiFetch<Customer>(
      "/customers",
      { method: "POST", body: JSON.stringify(data) },
      newCust
    );
  },
};
