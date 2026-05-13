import { db } from "./firebaseClient";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ALL_SERVICE_SEEDS } from "../data/serviceSeeds";

/**
 * Insère en base les fiches manquantes (clés stables seed-*).
 * Idempotent : ne réécrit pas les documents déjà présents avec le même id.
 */
export async function initializeServices() {
  try {
    const servicesRef = collection(db, "services");
    const snapshot = await getDocs(servicesRef);
    const existingIds = new Set(snapshot.docs.map((d) => d.id));

    let inserted = 0;
    for (const raw of ALL_SERVICE_SEEDS) {
      const id = raw.seedKey;
      if (existingIds.has(id)) continue;

      await setDoc(doc(db, "services", id), {
        ...raw,
        id,
      });
      inserted++;
      existingIds.add(id);
    }

    if (inserted > 0) {
      console.log(`Services: ${inserted} fiche(s) ajoutée(s) depuis les données de référence.`);
    }
    return inserted > 0;
  } catch (error) {
    console.error("Erreur lors de l'initialisation des services:", error);
    return false;
  }
}
