export enum GenderType {
    male = "Homem",
    female = "Mulher",
    nonbinary = "Não-binário",
    other = "Outro",
}

export enum RecordType {
  Cardio = "Cardiorrespiratório",
  Neurofunctional = "Neurofuncional",
  Trauma = "Trauma Ortopédico",
}

export enum ColorType {
  orange = 'Laranja',
  yellow = 'Amarelo',
  green = 'Verde',
  blue = 'Azul',
}

export enum PainType {
  Tactile = 'Tátil',
  Thermal = 'Térmico',
  Painful = 'Doloroso',
}

export enum SensitivityType {
  PositionSense = 'Posição',
  MovementSense = 'Movimento',
}

export enum FunctionalIndependenceType {
  Independent = 'Independente',
  PartiallyDependent = 'Parcialmente Dependente',
  Dependent = 'Dependente',
  CannotPerform = 'Não consegue realizar',
}

export enum DischargeType {
  purulent = 'Purulento',
  mucopurulent = 'Mucopurulento',
  mucoid = 'Mucoide',
  piohematic = 'Piohematóide',
  hematic = 'Hemático',
  rosacea = 'Rosácea',
  greenish = 'Esverdeado',
  yellowish = 'Amarelado',
}

export enum SecretionVolumeType {
  large = 'Grande',
  moderate = 'Moderado',
  small = 'Pequeno',
  absent = 'Ausente',
}

export enum SecretionFrequencyType {
  intermittent = 'Intermitente',
  persistent = 'Persistente',
  absent = 'Ausente',
}

export enum ChestShapeType {
  kyphotic = 'Cifótico',
  scoliotic = 'Escoliótico',
  kyphoscoliotic = 'Cifoescoliótico',
  barrel = 'Tórax em barril',
  hourglass = 'Ampulheta',
  pectusExcavatum = 'Pectus excavatum',
  pectusCarinatum = 'Pectus carinatum',
  normal = 'Normal',
  charpyAngle = 'Ângulo de Charpy',
}

export enum PhysicalSignType {
  accessory = 'Uso de musculatura acessória',
  retractions = 'Retrações',
  hooverSign = 'Sinal de Hoover',
  digitalClubbing = 'Baqueteamento digital',
  jugularVenousDistension = 'Distensão venosa jugular',
  normal = 'Normal',
}