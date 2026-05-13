import {
  getAllServices as firebaseGetAllServices,
  addService as firebaseAddService,
  findServiceById as firebaseFindServiceById,
} from "../lib/firebaseClient";
import { ALL_SERVICE_SEEDS } from "./serviceSeeds";

function seedsAsFallback() {
  return ALL_SERVICE_SEEDS.map((s) => ({
    ...s,
    id: s.seedKey,
  }));
}

export async function getAllServices() {
  try {
    const firebaseServices = await firebaseGetAllServices();
    if (firebaseServices && firebaseServices.length > 0) {
      return firebaseServices;
    }
    return seedsAsFallback();
  } catch (error) {
    console.error("Erreur getAllServices:", error.message);
    return seedsAsFallback();
  }
}

export async function addService(service) {
  try {
    return await firebaseAddService(service);
  } catch (error) {
    console.error("Erreur addService:", error.message);
    throw error;
  }
}

export async function findServiceById(id) {
  try {
    const firebaseService = await firebaseFindServiceById(id);
    if (firebaseService) {
      return firebaseService;
    }
    return seedsAsFallback().find((service) => service.id === id) ?? null;
  } catch (error) {
    console.error("Erreur findServiceById:", error.message);
    return seedsAsFallback().find((service) => service.id === id) ?? null;
  }
}
