import { tracesMock, logsMock, metricsMock } from './mockData.js';

const getTraces = async (question) => {
  const data = {
    traces: tracesMock,
  };
  return data;
}

const getLogs = async () => {
  const data = {
    logs: logsMock,
  };
  return data;
}

const getMetrics = async () => {
  const data = {
    metrics: metricsMock
  };
  return data;
}

const getCars = async () => {
  const data = {
    cars: [
      { id: 1, make: 'Toyota', model: 'Corolla', year: 2020 },
      { id: 2, make: 'Honda', model: 'Civic', year: 2021 },
      { id: 3, make: 'Ford', model: 'Mustang', year: 2019 },
    ]
  };
  return data;
}

const tools = [
  {
    type: "function",
    function: {
      name: "getTraces",
      description: "Returns traces data for the microservice.",
      parameters: {
        type: "object",
        properties: {
          question: { type: "string" }
        },
        required: ["question"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getCars",
      description: "Returns a list of cars.",
      parameters: {
        type: "object",
        properties: {},
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getLogs",
      description: "Returns logs data for the microservice.",
      parameters: {
        type: "object",
        properties: {},
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getMetrics",
      description: "Returns metrics data for the microservice.",
      parameters: {
        type: "object",
        properties: {},
      }
    }
  }
]

const availableTools = {
  getCars,
  getTraces,
  getLogs,
  getMetrics
};

export { 
    tools, 
    availableTools, 
};