// Ce fichier a été vidé car toutes les pages consomment désormais l'API backend dynamique.
export const allCites = [];
export const featuredCites = [];
export const allBuildings = [];
export const allRooms = [];
export const stats = [];
export const dashboardData = {
  owner: { stats: [], properties: [] },
  student: { name: "", activeStay: {}, activities: [] },
  admin: { totalRevenue: "", pendingApprovals: 0, activeStudents: 0 }
};
export const reservationData = {
  room: { name: "", location: "", image: "", amenities: [] }
};
