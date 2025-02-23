interface Plan {
  [key: string]: {
    id: number;
    state: string;
    price: number; 
    title: string;
    description: string;
    items: {
      item: string;
      status: boolean;
    }[];
  };
}

export const DatePricesCard: Plan = {
  basic: {
    id: 1,
    state: "NORMAL",
    price: 500,
    title: "Básico",
    description: "Comienza a aprender y ve contenido nuevo cada mes.",
    items: [
        {
          item: "Acceso a todos los proyectos",
          status: true,
        },
        {
          item: "Acceso a todos los talleres",
          status: false,
        },
        {
          item: "Acceso a todos los cursos",
          status: false,
        },
        {
          item: "Acceso a Discord",
          status: false,
        },
      ]
  },
  intermediate: {
    id: 2,
    state: "NORMAL",
    price: 700,
    title: "Intermedio",
    description: "Comienza a aprender y ve contenido nuevo cada mes.",
    items: [
      {
        item: "Acceso a todos los proyectos",
        status: true,
      },
      {
        item: "Acceso a todos los talleres",
        status: true,
      },
      {
        item: "Acceso a todos los cursos",
        status: false,
      },
      {
        item: "Acceso a Discord",
        status: false,
      },
    ],
  },
  professional: {
    id: 3,
    state: "MÁS POPULAR",
    price: 1000,
    title: "Profesional",
    description: "Comienza a aprender y ve contenido nuevo cada mes.",
    items: [
      {
        item: "Acceso a todos los proyectos",
        status: true,
      },
      {
        item: "Acceso a todos los talleres",
        status: true,
      },
      {
        item: "Acceso a todos los cursos",
        status: true,
      },
      {
        item: "Acceso a Discord",
        status: true,
      },
    ],
  },
  professionalPlus: {
    id: 4,
    state: "NORMAL",
    price: 1200,
    title: "Profesional+",
    description: "Comienza a aprender y ve contenido nuevo cada mes.",
    items: [
      {
        item: "Acceso a todos los proyectos",
        status: true,
      },
      {
        item: "Acceso a todos los talleres",
        status: true,
      },
      {
        item: "Acceso a todos los cursos",
        status: true,
      },
      {
        item: "Mentorías personalizadas",
        status: true,
      },
    ],
  },
};