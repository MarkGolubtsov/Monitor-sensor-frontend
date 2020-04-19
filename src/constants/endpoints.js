const serverApiUrl = 'http://localhost:8087';

export const endpoints = {
    getSensor: id => `${serverApiUrl}/sensors/${id}`,
    createSensor:`${serverApiUrl}/sensors`,
    putSensor: id => `${serverApiUrl}/sensors/${id}`,
    deleteSensor: id => `${serverApiUrl}/sensors/${id}`,
    getSensors: `${serverApiUrl}/sensors`,
    getTypes: `${serverApiUrl}/types`,
    getUnits: `${serverApiUrl}/units`,
    getToken: `${serverApiUrl}/login`
}
