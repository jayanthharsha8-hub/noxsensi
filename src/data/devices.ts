export type PhoneColor =
  | "black"
  | "silver"
  | "purple"
  | "green"
  | "lime"
  | "blue"
  | "orange";

export interface DeviceModel {
  id: string;
  name: string;
  year: number;
  code: string;
  processor: string;
  ramOptions: string[];
  color: PhoneColor;
}

export interface Brand {
  id: string;
  /** Label shown under the brand grid on Home (matches reference casing). */
  label: string;
  models: DeviceModel[];
}

const m = (
  id: string,
  name: string,
  year: number,
  code: string,
  processor: string,
  ramOptions: string[],
  color: PhoneColor,
): DeviceModel => ({ id, name, year, code, processor, ramOptions, color });

export const brands: Brand[] = [
  {
    id: "samsung",
    label: "Samsung",
    models: [
      m("galaxy-s4", "Galaxy S4", 2013, "SM-I9500", "Snapdragon 600", ["2GB", "3GB"], "black"),
      m("galaxy-s5", "Galaxy S5", 2014, "SM-G900F", "Snapdragon 801", ["2GB"], "blue"),
      m("galaxy-s6", "Galaxy S6", 2015, "SM-G920F", "Exynos 7420", ["3GB"], "black"),
      m("galaxy-s7", "Galaxy S7", 2016, "SM-G930F", "Exynos 8890", ["4GB"], "black"),
      m("galaxy-s8", "Galaxy S8", 2017, "SM-G950F", "Exynos 8895", ["4GB"], "silver"),
      m("galaxy-s9", "Galaxy S9", 2018, "SM-G960F", "Exynos 9810", ["4GB", "6GB"], "purple"),
      m("galaxy-s10", "Galaxy S10", 2019, "SM-G973F", "Exynos 9820", ["8GB"], "silver"),
      m("galaxy-s20", "Galaxy S20", 2020, "SM-G980F", "Exynos 990", ["8GB", "12GB"], "silver"),
      m("galaxy-s21", "Galaxy S21", 2021, "SM-G991B", "Exynos 2100", ["8GB"], "purple"),
      m("galaxy-s22", "Galaxy S22", 2022, "SM-S901B", "Exynos 2200", ["8GB"], "silver"),
      m("galaxy-s23", "Galaxy S23", 2023, "SM-S911B", "Snapdragon 8 Gen 2", ["8GB"], "green"),
      m("galaxy-s24", "Galaxy S24", 2024, "SM-S921B", "Snapdragon 8 Gen 3", ["8GB", "12GB"], "purple"),
      m("galaxy-s25", "Galaxy S25", 2025, "SM-S931B", "Snapdragon 8 Elite", ["12GB"], "black"),
      m("galaxy-a14", "Galaxy A14", 2023, "SM-A145F", "Exynos 1330", ["4GB", "6GB"], "lime"),
      m("galaxy-a15", "Galaxy A15", 2024, "SM-A155F", "Dimensity 6300", ["4GB", "6GB", "8GB"], "blue"),
      m("galaxy-a16", "Galaxy A16", 2024, "SM-A166F", "Exynos 1330", ["4GB", "6GB", "8GB"], "silver"),
      m("galaxy-a25", "Galaxy A25", 2023, "SM-A256F", "Exynos 1280", ["6GB", "8GB"], "blue"),
      m("galaxy-a34", "Galaxy A34", 2023, "SM-A346B", "Dimensity 7200", ["6GB", "8GB"], "lime"),
      m("galaxy-a35", "Galaxy A35", 2024, "SM-A356B", "Exynos 1380", ["6GB", "8GB"], "blue"),
      m("galaxy-a54", "Galaxy A54", 2023, "SM-A546B", "Exynos 1380", ["6GB", "8GB"], "purple"),
      m("galaxy-a55", "Galaxy A55", 2024, "SM-A556B", "Exynos 1480", ["8GB", "12GB"], "blue"),
      m("galaxy-a56", "Galaxy A56", 2025, "SM-A566B", "Exynos 1580", ["8GB", "12GB"], "black"),
      m("galaxy-a05s", "Galaxy A05s", 2023, "SM-A057F", "Snapdragon 680", ["4GB", "6GB"], "silver"),
      m("galaxy-m15", "Galaxy M15", 2024, "SM-M156B", "Exynos 1330", ["6GB", "8GB"], "black"),
      m("galaxy-m35", "Galaxy M35", 2024, "SM-M356B", "Exynos 1380", ["6GB", "8GB"], "blue"),
      m("galaxy-m55", "Galaxy M55", 2024, "SM-M556B", "Snapdragon 7 Gen 1", ["8GB", "12GB"], "lime"),
      m("galaxy-f14", "Galaxy F14", 2023, "SM-E146B", "Exynos 1330", ["4GB", "6GB"], "green"),
      m("galaxy-f55", "Galaxy F55", 2024, "SM-E556B", "Snapdragon 7 Gen 1", ["8GB"], "green"),
      m("galaxy-c55", "Galaxy C55", 2023, "SM-C556B", "Dimensity 1080", ["8GB"], "blue"),
      m("galaxy-z-flip5", "Galaxy Z Flip5", 2023, "SM-F731B", "Snapdragon 8 Gen 2", ["8GB"], "purple"),
      m("galaxy-z-flip6", "Galaxy Z Flip6", 2024, "SM-F741B", "Snapdragon 8 Gen 3", ["12GB"], "green"),
      m("galaxy-z-fold5", "Galaxy Z Fold5", 2023, "SM-F946B", "Snapdragon 8 Gen 2", ["12GB"], "black"),
      m("galaxy-z-fold6", "Galaxy Z Fold6", 2024, "SM-F956B", "Snapdragon 8 Gen 3", ["12GB"], "silver"),
    ],
  },
  {
    id: "xiaomi",
    label: "Xiaomi",
    models: [
      m("xiaomi-15", "Xiaomi 15", 2025, "2501PN31BG", "Snapdragon 8 Elite", ["12GB", "16GB"], "black"),
      m("xiaomi-14", "Xiaomi 14", 2023, "23127PN0BC", "Snapdragon 8 Gen 3", ["12GB"], "green"),
      m("xiaomi-13", "Xiaomi 13", 2022, "2211133C", "Snapdragon 8 Gen 2", ["8GB", "12GB"], "black"),
      m("xiaomi-13-pro", "Xiaomi 13 Pro", 2022, "2210132C", "Snapdragon 8 Gen 2", ["12GB"], "lime"),
      m("redmi-note-13-pro", "Redmi Note 13 Pro", 2024, "2312DRA50C", "Snapdragon 7s Gen 2", ["8GB", "12GB"], "purple"),
      m("redmi-note-12", "Redmi Note 12", 2023, "23021RAAEG", "Snapdragon 685", ["4GB", "6GB", "8GB"], "silver"),
      m("redmi-13c", "Redmi 13C", 2023, "23106RN0DI", "Helio G85", ["4GB", "6GB", "8GB"], "blue"),
      m("redmi-note-14-pro", "Redmi Note 14 Pro", 2025, "24115RA8CG", "Dimensity 7300", ["8GB", "12GB"], "blue"),
      m("xiaomi-14t-pro", "Xiaomi 14T Pro", 2024, "2406APNFAG", "Dimensity 9300+", ["12GB"], "silver"),
      m("xiaomi-15-ultra", "Xiaomi 15 Ultra", 2025, "2502PNEMBC", "Snapdragon 8 Elite", ["16GB"], "black"),
    ],
  },
  {
    id: "realme",
    label: "realme",
    models: [
      m("realme-13-pro-plus", "realme 13 Pro+", 2024, "RMX3990", "Snapdragon 7s Gen 2", ["8GB", "12GB"], "silver"),
      m("realme-12-pro-plus", "realme 12 Pro+", 2024, "RMX3840", "Snapdragon 7s Gen 2", ["8GB", "12GB"], "blue"),
      m("realme-11-pro", "realme 11 Pro", 2023, "RMX3771", "Dimensity 7050", ["8GB", "12GB"], "black"),
      m("realme-gt-6", "realme GT 6", 2024, "RMX3850", "Snapdragon 8s Gen 3", ["12GB", "16GB"], "green"),
      m("realme-gt-7", "realme GT 7", 2025, "RMX4010", "Dimensity 9400e", ["12GB"], "blue"),
      m("realme-narzo-60", "realme Narzo 60", 2023, "RMX3750", "Dimensity 6020", ["8GB", "12GB"], "purple"),
      m("realme-c67", "realme C67", 2024, "RMX3890", "Snapdragon 685", ["4GB", "6GB", "8GB"], "lime"),
      m("realme-10", "realme 10", 2022, "RMX3661", "Helio G99", ["4GB", "6GB", "8GB"], "black"),
      m("realme-14-pro-plus", "realme 14 Pro+", 2025, "RMX3999", "Snapdragon 7s Gen 3", ["8GB", "12GB"], "silver"),
      m("realme-narzo-70", "realme Narzo 70", 2024, "RMX3853", "Dimensity 7050", ["6GB", "8GB"], "orange"),
    ],
  },
  {
    id: "oppo",
    label: "OPPO",
    models: [
      m("find-x8", "Find X8", 2025, "CPH2651", "Dimensity 9400", ["12GB", "16GB"], "black"),
      m("find-x7", "Find X7", 2024, "CPH2589", "Dimensity 9300", ["12GB", "16GB"], "blue"),
      m("reno-11", "Reno 11", 2024, "CPH2597", "Dimensity 7050", ["8GB", "12GB"], "green"),
      m("reno-10", "Reno 10", 2023, "CPH2531", "Dimensity 7050", ["8GB"], "silver"),
      m("oppo-a78", "A78", 2023, "CPH2495", "Snapdragon 680", ["8GB"], "black"),
      m("oppo-a98", "A98", 2023, "CPH2529", "Snapdragon 695", ["8GB"], "purple"),
      m("oppo-k12x", "K12x", 2024, "CPH2627", "Dimensity 6300", ["6GB", "8GB"], "lime"),
      m("find-n3-flip", "Find N3 Flip", 2023, "CPH2519", "Dimensity 9200", ["12GB"], "green"),
      m("reno-13", "Reno 13", 2025, "CPH2687", "Dimensity 8350", ["12GB"], "blue"),
      m("oppo-a60", "A60", 2024, "CPH2631", "Snapdragon 680", ["8GB"], "silver"),
    ],
  },
  {
    id: "oneplus",
    label: "OnePlus",
    models: [
      m("oneplus-13", "OnePlus 13", 2025, "CPH2649", "Snapdragon 8 Elite", ["12GB", "16GB"], "blue"),
      m("oneplus-12", "OnePlus 12", 2024, "CPH2573", "Snapdragon 8 Gen 3", ["12GB", "16GB"], "green"),
      m("oneplus-11", "OnePlus 11", 2023, "CPH2447", "Snapdragon 8 Gen 2", ["12GB", "16GB"], "black"),
      m("oneplus-13r", "OnePlus 13R", 2025, "CPH2645", "Snapdragon 8 Gen 3", ["12GB"], "orange"),
      m("oneplus-nord-3", "Nord 3", 2023, "CPH2493", "Dimensity 9000", ["8GB", "12GB"], "silver"),
      m("oneplus-nord-4", "Nord 4", 2024, "CPH2661", "Snapdragon 7+ Gen 3", ["8GB", "12GB"], "silver"),
      m("oneplus-nord-ce4", "Nord CE4", 2024, "CPH2613", "Snapdragon 7 Gen 3", ["8GB"], "black"),
      m("oneplus-10-pro", "10 Pro", 2022, "NE2210", "Snapdragon 8 Gen 1", ["8GB", "12GB"], "green"),
      m("oneplus-12r", "12R", 2024, "CPH2585", "Snapdragon 8 Gen 2", ["8GB", "12GB"], "blue"),
      m("oneplus-nord-ce3", "Nord CE3", 2023, "CPH2549", "Snapdragon 782G", ["8GB"], "silver"),
    ],
  },
  {
    id: "vivo",
    label: "vivo",
    models: [
      m("vivo-x200", "X200", 2025, "V2413", "Dimensity 9400", ["12GB", "16GB"], "blue"),
      m("vivo-x100", "X100", 2024, "V2312", "Dimensity 9300", ["12GB", "16GB"], "black"),
      m("vivo-v40", "V40", 2024, "V2347", "Snapdragon 7 Gen 3", ["8GB", "12GB"], "purple"),
      m("vivo-v29", "V29", 2023, "V2231", "Snapdragon 778G", ["8GB", "12GB"], "black"),
      m("vivo-v50", "V50", 2025, "V2425", "Snapdragon 7 Gen 3", ["8GB", "12GB"], "silver"),
      m("vivo-y200", "Y200", 2023, "V2302", "Snapdragon 4 Gen 1", ["8GB"], "green"),
      m("vivo-t3-pro", "T3 Pro", 2024, "V2405", "Snapdragon 7s Gen 2", ["8GB"], "orange"),
      m("vivo-y100", "Y100", 2023, "V2224", "Dimensity 900", ["8GB"], "blue"),
      m("vivo-x200-pro", "X200 Pro", 2025, "V2414", "Dimensity 9400", ["16GB"], "black"),
      m("vivo-y28", "Y28", 2024, "V2354", "Dimensity 6020", ["6GB", "8GB"], "lime"),
    ],
  },
  {
    id: "iphone",
    label: "iPhone",
    models: [
      m("iphone-16-pro", "iPhone 16 Pro", 2024, "A3101", "Apple A18 Pro", ["8GB"], "black"),
      m("iphone-16", "iPhone 16", 2024, "A3286", "Apple A18", ["8GB"], "blue"),
      m("iphone-15-pro", "iPhone 15 Pro", 2023, "A3106", "Apple A17 Pro", ["8GB"], "silver"),
      m("iphone-15", "iPhone 15", 2023, "A3090", "Apple A16 Bionic", ["6GB"], "lime"),
      m("iphone-14-pro", "iPhone 14 Pro", 2022, "A2890", "Apple A16 Bionic", ["6GB"], "purple"),
      m("iphone-14", "iPhone 14", 2022, "A2882", "Apple A15 Bionic", ["6GB"], "blue"),
      m("iphone-13", "iPhone 13", 2021, "A2633", "Apple A15 Bionic", ["4GB"], "black"),
      m("iphone-se-2022", "iPhone SE (2022)", 2022, "A2782", "Apple A15 Bionic", ["4GB"], "black"),
      m("iphone-17", "iPhone 17", 2025, "A3310", "Apple A19", ["8GB"], "silver"),
      m("iphone-17-pro", "iPhone 17 Pro", 2025, "A3318", "Apple A19 Pro", ["8GB", "12GB"], "orange"),
    ],
  },
  {
    id: "iqoo",
    label: "iQOO",
    models: [
      m("iqoo-13", "iQOO 13", 2025, "I2401", "Snapdragon 8 Elite", ["12GB", "16GB"], "black"),
      m("iqoo-12", "iQOO 12", 2023, "I2310", "Snapdragon 8 Gen 3", ["12GB", "16GB"], "black"),
      m("iqoo-11", "iQOO 11", 2023, "I2217", "Snapdragon 8 Gen 2", ["12GB", "16GB"], "black"),
      m("iqoo-neo-9-pro", "Neo 9 Pro", 2024, "I2319", "Snapdragon 8 Gen 2", ["8GB", "12GB"], "blue"),
      m("iqoo-z9-pro", "Z9 Pro", 2024, "I2320", "Dimensity 9200+", ["8GB", "12GB"], "green"),
      m("iqoo-9-pro", "9 Pro", 2022, "I2127", "Snapdragon 8 Gen 1", ["8GB", "12GB"], "orange"),
      m("iqoo-neo-10", "Neo 10", 2025, "I2405", "Snapdragon 8s Gen 3", ["8GB", "12GB"], "silver"),
      m("iqoo-z10", "Z10", 2025, "I2410", "Dimensity 9300e", ["8GB", "12GB"], "blue"),
      m("iqoo-z7", "Z7", 2023, "I2219", "Dimensity 920", ["8GB"], "purple"),
      m("iqoo-11s", "11s", 2023, "I2314", "Snapdragon 8 Gen 2", ["12GB"], "lime"),
    ],
  },
  {
    id: "motorola",
    label: "motorola",
    models: [
      m("edge-50-pro", "Edge 50 Pro", 2024, "XT2437-1", "Snapdragon 7 Gen 3", ["8GB", "12GB"], "purple"),
      m("edge-60-pro", "Edge 60 Pro", 2025, "XT2445-1", "Dimensity 8350", ["12GB"], "blue"),
      m("edge-40", "Edge 40", 2023, "XT2303-1", "Dimensity 8020", ["8GB"], "black"),
      m("edge-30-ultra", "Edge 30 Ultra", 2022, "XT2241-1", "Snapdragon 8+ Gen 1", ["12GB"], "black"),
      m("moto-g84", "Moto G84", 2023, "XT2347-1", "Snapdragon 695", ["12GB"], "lime"),
      m("moto-g85", "Moto G85", 2024, "XT2427-1", "Snapdragon 6s Gen 3", ["8GB", "12GB"], "green"),
      m("moto-g64", "Moto G64", 2024, "XT2343-3", "Dimensity 7025", ["8GB", "12GB"], "silver"),
      m("razr-40-ultra", "Razr 40 Ultra", 2023, "XT2321-1", "Snapdragon 8+ Gen 1", ["8GB"], "purple"),
      m("edge-50-fusion", "Edge 50 Fusion", 2024, "XT2433-1", "Snapdragon 7s Gen 2", ["8GB", "12GB"], "blue"),
      m("moto-g45", "Moto G45", 2024, "XT2435-1", "Snapdragon 6s Gen 3", ["8GB"], "orange"),
    ],
  },
  {
    id: "google-pixel",
    label: "Google Pixel",
    models: [
      m("pixel-10-pro", "Pixel 10 Pro", 2025, "GC0Y0", "Tensor G5", ["16GB"], "black"),
      m("pixel-9-pro", "Pixel 9 Pro", 2024, "GC3E0", "Tensor G4", ["16GB"], "silver"),
      m("pixel-9", "Pixel 9", 2024, "GC5CH", "Tensor G4", ["12GB"], "lime"),
      m("pixel-8-pro", "Pixel 8 Pro", 2023, "GC8VE", "Tensor G3", ["12GB"], "black"),
      m("pixel-8", "Pixel 8", 2023, "GKWS6", "Tensor G3", ["8GB"], "blue"),
      m("pixel-8a", "Pixel 8a", 2024, "GKV4X", "Tensor G3", ["8GB"], "green"),
      m("pixel-9a", "Pixel 9a", 2025, "G6NN3", "Tensor G4", ["8GB"], "purple"),
      m("pixel-7", "Pixel 7", 2022, "GVU6C", "Tensor G2", ["8GB"], "silver"),
      m("pixel-7a", "Pixel 7a", 2023, "GWKK3", "Tensor G2", ["8GB"], "blue"),
      m("pixel-6a", "Pixel 6a", 2022, "GB7N6", "Tensor G1", ["6GB"], "lime"),
    ],
  },
  {
    id: "poco",
    label: "POCO",
    models: [
      m("poco-f7", "POCO F7", 2025, "25054PC19G", "Snapdragon 8s Gen 4", ["12GB"], "black"),
      m("poco-f6", "POCO F6", 2024, "24069PC21G", "Snapdragon 8s Gen 3", ["8GB", "12GB"], "black"),
      m("poco-f5", "POCO F5", 2023, "23049PCD5G", "Snapdragon 7+ Gen 2", ["8GB", "12GB"], "blue"),
      m("poco-x7", "POCO X7", 2025, "2505FPCCAG", "Dimensity 8400", ["8GB", "12GB"], "silver"),
      m("poco-x6-pro", "POCO X6 Pro", 2024, "2311DRG45G", "Dimensity 8300", ["8GB", "12GB"], "lime"),
      m("poco-x5-pro", "POCO X5 Pro", 2023, "23013PC75G", "Snapdragon 778G", ["6GB", "8GB"], "blue"),
      m("poco-m6-pro", "POCO M6 Pro", 2024, "2312FPCA6G", "Helio G99 Ultra", ["8GB", "12GB"], "purple"),
      m("poco-c65", "POCO C65", 2023, "2310BPC93G", "Helio G85", ["6GB", "8GB"], "green"),
      m("poco-m5", "POCO M5", 2022, "22071219CG", "Helio G99", ["4GB", "6GB"], "green"),
      m("poco-f5-pro", "POCO F5 Pro", 2023, "23053PC11G", "Snapdragon 8+ Gen 1", ["8GB", "12GB"], "silver"),
    ],
  },
  {
    id: "infinix",
    label: "Infinix",
    models: [
      m("infinix-note-50", "Note 50", 2025, "X6858", "Helio G99 Ultimate", ["8GB"], "black"),
      m("infinix-gt-30-pro", "GT 30 Pro", 2025, "X6831", "Dimensity 8350", ["12GB"], "silver"),
      m("infinix-gt-20-pro", "GT 20 Pro", 2024, "X6826", "Dimensity 8200 Ultimate", ["12GB"], "orange"),
      m("infinix-note-40", "Note 40", 2024, "X6850", "Helio G99 Ultimate", ["8GB", "12GB"], "black"),
      m("infinix-note-30", "Note 30", 2023, "X6831B", "Helio G99", ["8GB"], "blue"),
      m("infinix-hot-50", "Hot 50", 2024, "X6880", "Helio G100", ["8GB"], "lime"),
      m("infinix-hot-40-pro", "Hot 40 Pro", 2023, "X6835", "Helio G99", ["8GB"], "purple"),
      m("infinix-zero-30", "Zero 30", 2023, "X6731", "Dimensity 8020", ["12GB"], "green"),
      m("infinix-note-40-pro", "Note 40 Pro", 2024, "X6852", "Helio G99 Ultimate", ["8GB", "12GB"], "blue"),
      m("infinix-hot-30", "Hot 30", 2023, "X6831C", "Helio G88", ["8GB"], "blue"),
    ],
  },
];

export function getBrand(brandId: string): Brand | undefined {
  return brands.find((b) => b.id === brandId);
}

export function getModel(brandId: string, modelId: string): DeviceModel | undefined {
  return getBrand(brandId)?.models.find((x) => x.id === modelId);
}

/** Default RAM shown on the generator screen (reference state uses 8GB). */
export function defaultRam(model: DeviceModel): string {
  return model.ramOptions.includes("8GB") ? "8GB" : model.ramOptions[model.ramOptions.length - 1];
}
