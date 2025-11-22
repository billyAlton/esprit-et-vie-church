import apiClient from "@/lib/apiCaller";

const eventService = {
  getEvents: async () => {
    const response = await apiClient.get("/events/get");
    console.log("Fetched events:", response.data);
    return response.data;
  },
  createEvent: async (eventData: any) => {
    const response = await apiClient.post("/events", eventData);
    return response.data;
  },
  updateEvent: async (eventId: any, eventData: any) => {
    const response = await apiClient.put(`/events/${eventId}`, eventData);
    return response.data;
  },
  deleteEvent: async (eventId: any) => {
    const response = await apiClient.delete(`/events/${eventId}`);
    return response.data;
  },
};

export default eventService;
