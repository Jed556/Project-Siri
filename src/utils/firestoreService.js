import { db } from "firebaseConfig";
import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";

// ─── Collection Path Helpers ────────────────────────────────────────────────
// Firestore path: users/{uid}/{formType}/{docId}

const FORM_TYPES = {
    "Weekly Itinerary": "weekly-itinerary",
    "Training Commencement": "training-commencement",
    "Site Visit": "site-visit",
    "Summary of Accounts": "summary-of-accounts",
    "Summary of Arrangement": "summary-of-arrangement",
    "Summary of Target Accounts": "summary-of-target-accounts",
    "Masterlist of Accounts": "masterlist-of-accounts",
    "Purchase Order": "purchase-order",
    "Annual Corporate Distribution": "annual-corporate-distribution",
    "Budget Request": "budget-request",
    "Budget Release Tracker": "budget-release-tracker",
    "Client Entertainment Request": "client-entertainment-request",
};

/**
 * Get the Firestore collection slug for a form type string.
 */
function formSlug(type) {
    return FORM_TYPES[type] || type.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Return a collection reference for a user's form type.
 */
function userFormCollection(uid, formType) {
    return collection(db, "users", uid, formSlug(formType));
}

/**
 * Return a document reference inside a user's form collection.
 */
function userFormDoc(uid, formType, docId) {
    return doc(db, "users", uid, formSlug(formType), docId);
}

function serializeForFirestore(value) {
    if (value === undefined) return null;

    if (Array.isArray(value)) {
        return value.map((item) => {
            if (Array.isArray(item)) {
                return { __nestedArray: serializeForFirestore(item) };
            }
            return serializeForFirestore(item);
        });
    }

    if (value && typeof value === "object") {
        if (value instanceof Date) {
            return Timestamp.fromDate(value);
        }

        if (value instanceof Timestamp) {
            return value;
        }

        const serialized = {};
        Object.entries(value).forEach(([key, nestedValue]) => {
            if (nestedValue !== undefined) {
                serialized[key] = serializeForFirestore(nestedValue);
            }
        });
        return serialized;
    }

    return value;
}

function deserializeFromFirestore(value) {
    if (Array.isArray(value)) {
        return value.map((item) => deserializeFromFirestore(item));
    }

    if (value && typeof value === "object") {
        if (value instanceof Timestamp) {
            return value;
        }

        if (Object.prototype.hasOwnProperty.call(value, "__nestedArray")) {
            return deserializeFromFirestore(value.__nestedArray);
        }

        const deserialized = {};
        Object.entries(value).forEach(([key, nestedValue]) => {
            deserialized[key] = deserializeFromFirestore(nestedValue);
        });
        return deserialized;
    }

    return value;
}

function toMillis(value) {
    if (!value) return 0;
    if (value instanceof Timestamp) return value.toMillis();
    if (value instanceof Date) return value.getTime();
    if (typeof value === "number") return value;
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
}

// ─── CRUD Operations ────────────────────────────────────────────────────────

/**
 * Save (create or update) a form document.
 * @param {string} uid         – Firebase Auth uid
 * @param {string} formType    – Human-readable form type, e.g. "Weekly Itinerary"
 * @param {object} data        – The form payload (rows, metadata, etc.)
 * @param {string|null} docId  – Existing doc id to update, or null to create new
 * @returns {{ id: string }}   – The saved document id
 */
export async function saveFormDocument(uid, formType, data, docId = null) {
    const payload = {
        ...serializeForFirestore(data),
        type: formType,
        trashed: data?.trashed ?? false,
        updatedAt: serverTimestamp(),
    };

    if (docId) {
        const ref = userFormDoc(uid, formType, docId);
        await setDoc(ref, payload, { merge: true });
        return { id: docId };
    }

    // Create new
    payload.createdAt = serverTimestamp();
    payload.name = data.name || `${formType} – ${new Date().toLocaleDateString()}`;
    const ref = await addDoc(userFormCollection(uid, formType), payload);
    return { id: ref.id };
}

/**
 * Get a single form document.
 */
export async function getFormDocument(uid, formType, docId) {
    const ref = userFormDoc(uid, formType, docId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...deserializeFromFirestore(snap.data()) };
}

/**
 * List all non-trashed form documents for a user & form type,
 * ordered by most recently updated.
 */
export async function listFormDocuments(uid, formType) {
    const colRef = userFormCollection(uid, formType);
    const snap = await getDocs(colRef);

    return snap.docs
        .map((documentSnapshot) => ({
            id: documentSnapshot.id,
            ...deserializeFromFirestore(documentSnapshot.data()),
        }))
        .filter((documentData) => !documentData.trashed)
        .sort((a, b) => toMillis(b.updatedAt) - toMillis(a.updatedAt));
}

/**
 * Soft-delete (trash) a form document.
 */
export async function trashFormDocument(uid, formType, docId) {
    const ref = userFormDoc(uid, formType, docId);
    await updateDoc(ref, { trashed: true, updatedAt: serverTimestamp() });
}

/**
 * Permanently delete a form document.
 */
export async function deleteFormDocument(uid, formType, docId) {
    const ref = userFormDoc(uid, formType, docId);
    await deleteDoc(ref);
}

// ─── User Profile ───────────────────────────────────────────────────────────
// Path: users/{uid}

/**
 * Get user profile document.
 */
export async function getUserProfile(uid) {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
}

/**
 * Create or update user profile.
 */
export async function saveUserProfile(uid, profile) {
    const ref = doc(db, "users", uid);
    await setDoc(
        ref,
        {
            ...profile,
            updatedAt: serverTimestamp(),
        },
        { merge: true }
    );
}

export { FORM_TYPES, formSlug };
