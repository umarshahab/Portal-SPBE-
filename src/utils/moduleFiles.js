const MODULE_BASE_PATH = "/modules";

export const getModuleFile = (indicatorId) => {
  const id = Number(indicatorId);

  if (!Number.isInteger(id) || id < 1 || id > 20) {
    return null;
  }

  return `${MODULE_BASE_PATH}/Modul%20Indikator%20${id}.pptx`;
};

export const moduleFiles = Object.fromEntries(
  Array.from({ length: 20 }, (_, index) => {
    const id = index + 1;

    return [
      id,
      getModuleFile(id),
    ];
  })
);
