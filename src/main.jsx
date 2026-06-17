import React,{useMemo,useState,useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import { App as CapacitorApp } from '@capacitor/app';
import { supabase, supabaseConfigured } from './lib/supabase';
import {Menu,Home,Users,CalendarDays,Plus,UserCircle,Bell,Search,Upload,Edit3,Trash2,Save,ChevronRight,Building2,CheckCircle2,Image as ImageIcon,Download,Share2,BriefcaseBusiness,ShieldCheck,X} from 'lucide-react';
import './styles.css';

const SECTORS=['All','Healthcare','Automotive','Education','Construction','Hospitality','Food & Beverage','Retail & Trading','Technology','Finance & Consulting','Manufacturing','Media & Creative','Travel & Tourism','Real Estate','Professional Services'];
const CATEGORY_ICONS={
  'All':'🌐',
  'Healthcare':'🏥',
  'Automotive':'🚗',
  'Education':'🎓',
  'Construction':'🏗️',
  'Hospitality':'🏨',
  'Food & Beverage':'🍽️',
  'Retail & Trading':'🛍️',
  'Technology':'💻',
  'Finance & Consulting':'💼',
  'Manufacturing':'🏭',
  'Media & Creative':'🎬',
  'Travel & Tourism':'✈️',
  'Real Estate':'🏠',
  'Professional Services':'📋'
};

const seedMembers=[
  {
    "id": "m001",
    "name": "A. Hemanta Sharma",
    "position": "Dealer",
    "company": "NR Motors",
    "category": "Automotive",
    "email": "nrmotors_2017@yahoo.com",
    "phone": "9436893975",
    "address": "MG Avenue, Imphal - 795001, Manipur",
    "services": "Dealer - Mahindra Truck & Bus",
    "about": "NR Motors is listed as an approved AMBI/BEG member in the Automotive sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m002",
    "name": "Aadarsh Sharma",
    "position": "Managing Partner",
    "company": "Aadarsh Lab and Aadarsh Medicare Services",
    "category": "Healthcare",
    "email": "aadarshsharma1237@gmail.com",
    "phone": "7005242123",
    "address": "Imphal, Manipur",
    "services": "Diagnostic Centre / Aadarsh Medicare Services",
    "about": "Aadarsh Lab and Aadarsh Medicare Services is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m003",
    "name": "Abhishek Jain",
    "position": "Partner",
    "company": "Sangai Technologies",
    "category": "Technology",
    "email": "",
    "phone": "",
    "address": "Imphal, Manipur",
    "services": "Technology Services",
    "about": "Sangai Technologies is listed as an approved AMBI/BEG member in the Technology sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m004",
    "name": "Amardeep Singh Cheema",
    "position": "Director",
    "company": "MGT MOTORS PVT LTD",
    "category": "Automotive",
    "email": "asc@mgtmotors.com",
    "phone": "+919436025331",
    "address": "M G Avenue Imphal Manipur",
    "services": "Automobile Dealership",
    "about": "MGT MOTORS PVT LTD is listed as an approved AMBI/BEG member in the Automotive sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m005",
    "name": "Anand Sapam",
    "position": "Tax & Corporate Law Consultant",
    "company": "SA AND ASSOCIATES",
    "category": "Finance & Consulting",
    "email": "anand.sapam11@gmail.com",
    "phone": "9612904757",
    "address": "Keishamthong, Imphal West",
    "services": "Consultancy Services",
    "about": "SA AND ASSOCIATES is listed as an approved AMBI/BEG member in the Finance & Consulting sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m006",
    "name": "Angom Karna",
    "position": "Proprietor",
    "company": "Studio11 Salon and Spa, Fitness World, Ahong Achao Keithel",
    "category": "Retail & Trading",
    "email": "angomk.psd@gmail.com",
    "phone": "8731865955",
    "address": "Singjamei Mathak chongtham leikai, Kakching",
    "services": "Retail and service sector",
    "about": "Studio11 Salon and Spa, Fitness World, Ahong Achao Keithel is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m007",
    "name": "Anthony Naulak",
    "position": "Proprietor",
    "company": "Pollito's",
    "category": "Food & Beverage",
    "email": "",
    "phone": "",
    "address": "Singjamei Chingamathak",
    "services": "Food Service / Restaurant",
    "about": "Pollito's is listed as an approved AMBI/BEG member in the Food & Beverage sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m008",
    "name": "Arihant Patni",
    "position": "Partner",
    "company": "Sanmati Traders",
    "category": "Retail & Trading",
    "email": "",
    "phone": "",
    "address": "Imphal, Manipur",
    "services": "General Trading",
    "about": "Sanmati Traders is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m009",
    "name": "Ashangbam Vivekananda Singh",
    "position": "Proprietor",
    "company": "PADMA Medicare",
    "category": "Healthcare",
    "email": "padmamedicare2@gmail.com",
    "phone": "9446026455",
    "address": "RIMS Road, Near Nityanand Mandir",
    "services": "Medical / Healthcare",
    "about": "PADMA Medicare is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m010",
    "name": "Ashish Warepam",
    "position": "Proprietor",
    "company": "JCNT",
    "category": "Construction",
    "email": "ashish_w@outlook.com",
    "phone": "8415930129",
    "address": "Wangkhei Palace Compound, Imphal East-05, Manipur",
    "services": "Turnkey Solutions of Elevators, Fire Fighting & CCTV Surveillance",
    "about": "JCNT is listed as an approved AMBI/BEG member in the Construction sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m011",
    "name": "B. Surchandra Sharma",
    "position": "Secretary",
    "company": "The Fancier Educational Society, Thoubal",
    "category": "Education",
    "email": "fanciersur@gmail.com",
    "phone": "9862074363",
    "address": "Thoubal Wangmataba",
    "services": "Education",
    "about": "The Fancier Educational Society, Thoubal is listed as an approved AMBI/BEG member in the Education sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m012",
    "name": "Bachaspatimayum Indrashwor Sharma",
    "position": "Founder/Proprietor",
    "company": "Laisukol (school), Bachaspati drug agency (pharmacy)",
    "category": "Healthcare",
    "email": "indrashworsharma@gmail.com",
    "phone": "9612503024",
    "address": "Thoubal Bazar Makha, Thoubal Wangmataba",
    "services": "Human resources / sales",
    "about": "Laisukol (school), Bachaspati drug agency (pharmacy) is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m013",
    "name": "Bankim Nongthombam",
    "position": "Managing Director",
    "company": "Imphal Valley School; P.G Petroleum Agency; Sumati and Sons Group",
    "category": "Education",
    "email": "bankimnongthombam@gmail.com",
    "phone": "0385-2427613",
    "address": "Khabam, Chingmeirong, Moirangkhom Yaiskhul",
    "services": "Education; Retail",
    "about": "Imphal Valley School; P.G Petroleum Agency; Sumati and Sons Group is listed as an approved AMBI/BEG member in the Education sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m014",
    "name": "Benjamin Papao",
    "position": "Sound Wave",
    "company": "Benjamin Papao",
    "category": "Technology",
    "email": "",
    "phone": "",
    "address": "Churchandpur",
    "services": "Audio/Sound Services",
    "about": "Benjamin Papao is listed as an approved AMBI/BEG member in the Technology sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m015",
    "name": "Bigya Pheiroijam",
    "position": "Proprietor",
    "company": "Dotcom Computers",
    "category": "Technology",
    "email": "singhbigya31@gmail.com",
    "phone": "9862033771",
    "address": "Thangal Bazar, M.G. Avenue",
    "services": "Computer, Peripherals Sales & Service",
    "about": "Dotcom Computers is listed as an approved AMBI/BEG member in the Technology sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m016",
    "name": "Chingangbam Gulshan Singh",
    "position": "Proprietor",
    "company": "ALS IAS IMPHAL",
    "category": "Education",
    "email": "chingangbamg@gmail.com",
    "phone": "9856209399",
    "address": "Khurana Ahongei Leirak",
    "services": "Education",
    "about": "ALS IAS IMPHAL is listed as an approved AMBI/BEG member in the Education sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m017",
    "name": "Chingshubam Ashok Meetei",
    "position": "Managing Director",
    "company": "Meetei Construction Pvt Ltd",
    "category": "Education",
    "email": "ashok@meeteicpl.com",
    "phone": "9862223333",
    "address": "Porompat and Ayangpalli Road",
    "services": "Construction & School",
    "about": "Meetei Construction Pvt Ltd is listed as an approved AMBI/BEG member in the Education sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m018",
    "name": "Chongtham Punshiba Singh",
    "position": "Owner",
    "company": "Bath Gallery",
    "category": "Retail & Trading",
    "email": "punshi11@rediffmail.com",
    "phone": "9862033724",
    "address": "Khabam lamkhai",
    "services": "Tiles and sanitary",
    "about": "Bath Gallery is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m019",
    "name": "Dayanand Thounaojam",
    "position": "Proprietor",
    "company": "Tilakraj Enterprises",
    "category": "Manufacturing",
    "email": "daya7us@gmail.com",
    "phone": "700585361",
    "address": "Thangal Bazar, opp. Kasturi Building, Imphal",
    "services": "Manufacturing & sales of Souvenirs, Trophy, Memento, Rubber stamp, Medals and Brass handicrafts",
    "about": "Tilakraj Enterprises is listed as an approved AMBI/BEG member in the Manufacturing sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m020",
    "name": "Donny Sharma",
    "position": "Distributor",
    "company": "Radha Enterprises (Fleet Guard filter pvt ltd and Mico)",
    "category": "Retail & Trading",
    "email": "risonsmotors14@gmail.com",
    "phone": "8787574740",
    "address": "Khoyathong Bazar",
    "services": "Distribution",
    "about": "Radha Enterprises (Fleet Guard filter pvt ltd and Mico) is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m021",
    "name": "Dr M. Dayananda (Pibarel)",
    "position": "Managing Director",
    "company": "Medilane Healthtech And Consultancy Services Private Limited",
    "category": "Healthcare",
    "email": "medilane.in@gmail.com",
    "phone": "9366538001",
    "address": "Porompat Near JNIMS Hospital, Imphal East, Manipur",
    "services": "Healthcare",
    "about": "Medilane Healthtech And Consultancy Services Private Limited is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m022",
    "name": "Dr Ibomcha Thokchom",
    "position": "Founder & Managing Director",
    "company": "Advanced Hospital",
    "category": "Healthcare",
    "email": "ithokcho@yahoo.co.in",
    "phone": "+919436026045",
    "address": "Palace Compound, Imphal East",
    "services": "Healthcare",
    "about": "Advanced Hospital is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m023",
    "name": "Dr James Elangbam",
    "position": "Managing Director",
    "company": "Acme Fertility & HealthCare Centre",
    "category": "Healthcare",
    "email": "acmefertility@gmail.com",
    "phone": "6909158069",
    "address": "Hiyang Hiren Leirak, Palace Compound, Imphal East",
    "services": "IVF Centre and Gynecological Centre",
    "about": "Acme Fertility & HealthCare Centre is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m024",
    "name": "Elizabeth Yambem",
    "position": "Member",
    "company": "Dweller Tea",
    "category": "Food & Beverage",
    "email": "",
    "phone": "",
    "address": "Lamphel",
    "services": "Beverage/Tea Retail",
    "about": "Dweller Tea is listed as an approved AMBI/BEG member in the Food & Beverage sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m025",
    "name": "Gautam Sharma Shamurailatpam",
    "position": "Executive Editor",
    "company": "The People's Chronicle / Poknapham",
    "category": "Media & Creative",
    "email": "shgautam79@gmail.com",
    "phone": "9436021276",
    "address": "Imphal, Manipur",
    "services": "Media n printing press / Padma printers",
    "about": "The People's Chronicle / Poknapham is listed as an approved AMBI/BEG member in the Media & Creative sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m026",
    "name": "Gitkumar Nepram",
    "position": "Member",
    "company": "Habitat World (Habitat Design Studio)",
    "category": "Professional Services",
    "email": "",
    "phone": "",
    "address": "Sagolband",
    "services": "Architecture/Design",
    "about": "Habitat World (Habitat Design Studio) is listed as an approved AMBI/BEG member in the Professional Services sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m027",
    "name": "Hero Thokchom",
    "position": "Managing Director",
    "company": "Iboyaima Hospital & Research centre / Golden Transpower / Iboyaima & Sons",
    "category": "Healthcare",
    "email": "hthokchom@yahoo.co.in",
    "phone": "7005123802",
    "address": "Singjamei Mathak Chongtham Leikai",
    "services": "Healthcare Products",
    "about": "Iboyaima Hospital & Research centre / Golden Transpower / Iboyaima & Sons is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m028",
    "name": "Hodam Priyokumar",
    "position": "President",
    "company": "Fancier Educational Society",
    "category": "Education",
    "email": "fancierpriyo@gmail.com",
    "phone": "9612501599",
    "address": "Thoubal Okram Wangmataba, Thoubal",
    "services": "Education",
    "about": "Fancier Educational Society is listed as an approved AMBI/BEG member in the Education sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m029",
    "name": "Huidrom Bigyanjit Singh",
    "position": "Director",
    "company": "HVS Construction Materials Pvt Ltd",
    "category": "Construction",
    "email": "bigyanjit_huidrom@yahoo.com",
    "phone": "8415902857",
    "address": "Patsoi part 1, New Cacchhar road",
    "services": "Construction",
    "about": "HVS Construction Materials Pvt Ltd is listed as an approved AMBI/BEG member in the Construction sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m030",
    "name": "Irom Umakanta Singh",
    "position": "Managing Director",
    "company": "COMET School And Coaching institute",
    "category": "Education",
    "email": "usingirom@gmail.com",
    "phone": "9612637445",
    "address": "Changangei Uchekon n Keishampat",
    "services": "Education",
    "about": "COMET School And Coaching institute is listed as an approved AMBI/BEG member in the Education sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m031",
    "name": "Jacky Sharma Shamurailatpam",
    "position": "Member",
    "company": "Adarsh Lab (Aadarsh Medicare Services)",
    "category": "Healthcare",
    "email": "",
    "phone": "",
    "address": "Porompat",
    "services": "Healthcare Services",
    "about": "Adarsh Lab (Aadarsh Medicare Services) is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m032",
    "name": "James Kangabam",
    "position": "Proprietor",
    "company": "Shree Manikumar Jewellery",
    "category": "Retail & Trading",
    "email": "jameskangabam123@gmail.com",
    "phone": "7005130776",
    "address": "Sagolband kangabam Leikai",
    "services": "Retail",
    "about": "Shree Manikumar Jewellery is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m033",
    "name": "Javed Siddique",
    "position": "Proprietor",
    "company": "JS PLY",
    "category": "Manufacturing",
    "email": "jst237@gmail.com",
    "phone": "",
    "address": "Thangal bazar / Mantripukhri",
    "services": "Plywood, Laminates, MDF, etc.",
    "about": "JS PLY is listed as an approved AMBI/BEG member in the Manufacturing sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m034",
    "name": "Jayananda",
    "position": "Member",
    "company": "Jayananda United Enterprises",
    "category": "Retail & Trading",
    "email": "",
    "phone": "",
    "address": "Imphal, Manipur",
    "services": "Trade/Enterprise",
    "about": "Jayananda United Enterprises is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m035",
    "name": "Jiten Sharma Aribam",
    "position": "Proprietor",
    "company": "Sharma Associates",
    "category": "Travel & Tourism",
    "email": "jiten_sharmaa@yahoo.co.in",
    "phone": "09862241741",
    "address": "Thoubal Bazar",
    "services": "Travel/tourism and Garment's",
    "about": "Sharma Associates is listed as an approved AMBI/BEG member in the Travel & Tourism sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m036",
    "name": "Kangjam Dinesh",
    "position": "Member",
    "company": "OPPO",
    "category": "Technology",
    "email": "",
    "phone": "",
    "address": "Nongmeibung",
    "services": "Telecommunications/Retail",
    "about": "OPPO is listed as an approved AMBI/BEG member in the Technology sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m037",
    "name": "KB Pangambam",
    "position": "Proprietor",
    "company": "KB Enterprises",
    "category": "Travel & Tourism",
    "email": "kbento@gmail.com",
    "phone": "9862028656",
    "address": "MG Avenue, Imphal",
    "services": "Tour Operator (Forex, Visa, Passports, Ticketing, Inbound & Outbound)",
    "about": "KB Enterprises is listed as an approved AMBI/BEG member in the Travel & Tourism sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m038",
    "name": "Khaba Sanabam",
    "position": "Proprietor",
    "company": "Reliable Sales",
    "category": "Automotive",
    "email": "khabasanabam@gmail.com",
    "phone": "09862576922",
    "address": "Thangal Bazar, Khoyathong Road",
    "services": "Motor Parts",
    "about": "Reliable Sales is listed as an approved AMBI/BEG member in the Automotive sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m039",
    "name": "Khagemba Sanabam",
    "position": "Managing Director",
    "company": "Manipur Oxygen Plant Pvt. Ltd.",
    "category": "Healthcare",
    "email": "ksanabam@gmail.com",
    "phone": "09862569861",
    "address": "Ward no.10, Bishnupur District",
    "services": "Medical and industrial oxygen",
    "about": "Manipur Oxygen Plant Pvt. Ltd. is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m040",
    "name": "Kiltan Maibam",
    "position": "Businessman",
    "company": "Airport Shopping Mall",
    "category": "Automotive",
    "email": "kiltan_maibam24@yahoo.com",
    "phone": "7085557176",
    "address": "Changangei airport road, Opp. Imphal Airport",
    "services": "Furnitures & Furnishing",
    "about": "Airport Shopping Mall is listed as an approved AMBI/BEG member in the Automotive sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m041",
    "name": "Kshetrimayum Rustamkumar Singh",
    "position": "Proprietor",
    "company": "M/s Wangbrel decor",
    "category": "Retail & Trading",
    "email": "kshrustamkumar@gmail.com",
    "phone": "8413877340",
    "address": "Singjamei chinga mathak opposite UCO Bank",
    "services": "Home and office Furniture showroom",
    "about": "M/s Wangbrel decor is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m042",
    "name": "L Sanatombi Devi",
    "position": "Chairman",
    "company": "Iboyaima Group",
    "category": "Healthcare",
    "email": "thokongbisana@gmail.com",
    "phone": "9436890363",
    "address": "Singjamei Mathak Chongtham leikai",
    "services": "Health care, Finance, Power, Construction",
    "about": "Iboyaima Group is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m043",
    "name": "Laishram Brijkeshowr Singh",
    "position": "Proprietor",
    "company": "Phou-Oi-Bee hotel",
    "category": "Hospitality",
    "email": "brijkishowr86@gmail.com",
    "phone": "8731921044",
    "address": "North AOC Imphal",
    "services": "Hotel",
    "about": "Phou-Oi-Bee hotel is listed as an approved AMBI/BEG member in the Hospitality sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m044",
    "name": "Laishram Kishan Singh",
    "position": "Proprietor",
    "company": "Kishan Eco Plastic Industry",
    "category": "Manufacturing",
    "email": "kepimd26@gmail.com",
    "phone": "7005402125",
    "address": "Tera Urak Industrial Estate, Bishnupur",
    "services": "Manufacturing PVC pipes",
    "about": "Kishan Eco Plastic Industry is listed as an approved AMBI/BEG member in the Manufacturing sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m045",
    "name": "Leishangtham Ronel Singh",
    "position": "Member",
    "company": "RSRS",
    "category": "Professional Services",
    "email": "",
    "phone": "",
    "address": "Patsoi",
    "services": "Transport/Services",
    "about": "RSRS is listed as an approved AMBI/BEG member in the Professional Services sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m046",
    "name": "M Geetaranjan Sharma",
    "position": "Member",
    "company": "LISMART INDUSTRIES",
    "category": "Manufacturing",
    "email": "lismart_sangai@yahoo.in",
    "phone": "0385-2412377 / 986209740",
    "address": "84/Shop-cum Res. Complex (Super Market) Lamphel",
    "services": "Sangai Plastic water storage tank & Sangai UPVC pipes, sewage pipes",
    "about": "LISMART INDUSTRIES is listed as an approved AMBI/BEG member in the Manufacturing sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m047",
    "name": "N. Dhinel Singh",
    "position": "Proprietor",
    "company": "ND INDUSTRIES",
    "category": "Manufacturing",
    "email": "ndhinelsingh@gmail.com",
    "phone": "8974036490",
    "address": "Mantripukhri, Imphal",
    "services": "Package Drinking Water - Bisleri Brand",
    "about": "ND INDUSTRIES is listed as an approved AMBI/BEG member in the Manufacturing sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m048",
    "name": "Nishant Patni",
    "position": "Member",
    "company": "PCTC",
    "category": "Professional Services",
    "email": "",
    "phone": "",
    "address": "Imphal, Manipur",
    "services": "Transport/Logistics",
    "about": "PCTC is listed as an approved AMBI/BEG member in the Professional Services sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m049",
    "name": "P Kebi Singh",
    "position": "Partner",
    "company": "Geo-Environmental & Technical Services",
    "category": "Professional Services",
    "email": "kebimphal@gmail.com",
    "phone": "09774196652",
    "address": "Opposite Manipur University",
    "services": "Geophysical Services, etc.",
    "about": "Geo-Environmental & Technical Services is listed as an approved AMBI/BEG member in the Professional Services sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m050",
    "name": "Pheiroijam Romikanta Singh",
    "position": "Member",
    "company": "Iland Nissan",
    "category": "Automotive",
    "email": "",
    "phone": "",
    "address": "Canchipur",
    "services": "Automobile Dealership",
    "about": "Iland Nissan is listed as an approved AMBI/BEG member in the Automotive sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m051",
    "name": "Potsangbam Tomba",
    "position": "Member",
    "company": "Tomba Enterprises",
    "category": "Construction",
    "email": "",
    "phone": "",
    "address": "Singjamei Chingamakha",
    "services": "Construction",
    "about": "Tomba Enterprises is listed as an approved AMBI/BEG member in the Construction sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m052",
    "name": "Pradeep Singh Meitram",
    "position": "Chief Executive Officer",
    "company": "Elle's Group",
    "category": "Food & Beverage",
    "email": "psmeitram@gmail.com",
    "phone": "7005203128",
    "address": "#22, PDA Complex, Lamphelpat, Imphal, Manipur",
    "services": "Bakery, interior solutions, IT & communications, skill development",
    "about": "Elle's Group is listed as an approved AMBI/BEG member in the Food & Beverage sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m053",
    "name": "Puyam Surchand Singh",
    "position": "Managing Director",
    "company": "Siroi financial consultancy Pvt Ltd",
    "category": "Finance & Consulting",
    "email": "surchandp@gmail.com",
    "phone": "8118925964",
    "address": "MG Avenue",
    "services": "Financial Services",
    "about": "Siroi financial consultancy Pvt Ltd is listed as an approved AMBI/BEG member in the Finance & Consulting sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m054",
    "name": "Radhesyam Oinam",
    "position": "Chief Coordinator",
    "company": "Network Services",
    "category": "Retail & Trading",
    "email": "radhesyamoinam@yahoo.com",
    "phone": "9436026403",
    "address": "Changangei Uchekon, Imphal West",
    "services": "Retail Servicing",
    "about": "Network Services is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m055",
    "name": "Rakesh Konjengbam",
    "position": "Founder",
    "company": "Ingenix Educare",
    "category": "Education",
    "email": "rakesh.konjengbam@gmail.com",
    "phone": "8730935858",
    "address": "Konung Mamang New Checkon Road",
    "services": "Career Guidance and Counseling",
    "about": "Ingenix Educare is listed as an approved AMBI/BEG member in the Education sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m056",
    "name": "Rakesh Takhellambam",
    "position": "Member",
    "company": "Indra Eye Care",
    "category": "Healthcare",
    "email": "",
    "phone": "",
    "address": "RIMS Road",
    "services": "Eye care products",
    "about": "Indra Eye Care is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m057",
    "name": "Ramesh Urikhaibam",
    "position": "Member",
    "company": "Pranab Motors",
    "category": "Automotive",
    "email": "",
    "phone": "",
    "address": "Mayang Imphal",
    "services": "Automotive Retail",
    "about": "Pranab Motors is listed as an approved AMBI/BEG member in the Automotive sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m058",
    "name": "Ripujeet Nongthombam",
    "position": "Managing Director",
    "company": "Lee Waa Group",
    "category": "Construction",
    "email": "carter.nongthombam@gmail.com",
    "phone": "+916009874675",
    "address": "Ghari Awang Leikai",
    "services": "Construction, Design & Supply",
    "about": "Lee Waa Group is listed as an approved AMBI/BEG member in the Construction sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m059",
    "name": "Rishikesh Khundongbam",
    "position": "Managing Director",
    "company": "Mipax Real Estate Consultant Pvt. Ltd.",
    "category": "Finance & Consulting",
    "email": "rishikesh.kh36@gmail.com",
    "phone": "7005230583",
    "address": "Sangaiprou (Opposite FCS Godown), Imphal West",
    "services": "Real Estate Syndication, Development Consultant & PMC",
    "about": "Mipax Real Estate Consultant Pvt. Ltd. is listed as an approved AMBI/BEG member in the Finance & Consulting sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m060",
    "name": "RK Budhisaran",
    "position": "Member",
    "company": "Pioneer Trading",
    "category": "Retail & Trading",
    "email": "",
    "phone": "",
    "address": "Keisamthong",
    "services": "General Trading",
    "about": "Pioneer Trading is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m061",
    "name": "Vinykesh Patni",
    "position": "Director",
    "company": "Dhana Lakshmi Pvt Ltd",
    "category": "Hospitality",
    "email": "vinykesh.patni@vpgroup.co.in",
    "phone": "9862558958",
    "address": "Padma Bhawan, Dharamsala Road",
    "services": "Pharmaceuticals, FMCG, Hotel",
    "about": "Dhana Lakshmi Pvt Ltd is listed as an approved AMBI/BEG member in the Hospitality sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m062",
    "name": "Vitoo Oinam",
    "position": "Co-founder and Managing Director",
    "company": "SF Delivery (Soultifaction Online Services LLP)",
    "category": "Food & Beverage",
    "email": "info@soultifaction.com",
    "phone": "9077808818",
    "address": "New Checkon Road, Imphal - 795005",
    "services": "Online Food Delivery",
    "about": "SF Delivery (Soultifaction Online Services LLP) is listed as an approved AMBI/BEG member in the Food & Beverage sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m063",
    "name": "Wangkheimayum Khoma",
    "position": "Member",
    "company": "Sanamahi Motors",
    "category": "Automotive",
    "email": "",
    "phone": "",
    "address": "Singjamei Chingamathak",
    "services": "Automotive Support",
    "about": "Sanamahi Motors is listed as an approved AMBI/BEG member in the Automotive sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m064",
    "name": "Wangkheimayum Vikram",
    "position": "Managing Director",
    "company": "The Sangai Hotel",
    "category": "Hospitality",
    "email": "vikram_sana@yahoo.com",
    "phone": "9612164935",
    "address": "Nagamapal, Lamabam Leikai, Imphal, Manipur",
    "services": "Hotel",
    "about": "The Sangai Hotel is listed as an approved AMBI/BEG member in the Hospitality sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m065",
    "name": "Wangkhem Lenin",
    "position": "Member",
    "company": "W. Ibohal Singh & Sons",
    "category": "Retail & Trading",
    "email": "",
    "phone": "",
    "address": "W. Ibohal Singh & Sons",
    "services": "Trading/Retail",
    "about": "W. Ibohal Singh & Sons is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m066",
    "name": "Y Ashok Kumar",
    "position": "Member",
    "company": "Leibaklei Hotel",
    "category": "Healthcare",
    "email": "",
    "phone": "",
    "address": "Jiri",
    "services": "Hospitality",
    "about": "Leibaklei Hotel is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m067",
    "name": "Yanglem Surjeet",
    "position": "Proprietor",
    "company": "Fastrack Signage",
    "category": "Media & Creative",
    "email": "yangsurjeet@gmail.com",
    "phone": "9856080024",
    "address": "Thangmeiband Watham Leirai",
    "services": "Sign and banner service",
    "about": "Fastrack Signage is listed as an approved AMBI/BEG member in the Media & Creative sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m068",
    "name": "Yumnam Rupachandra Singh",
    "position": "Editor in Chief",
    "company": "Impact TV News",
    "category": "Media & Creative",
    "email": "yumnamrupa@gmail.com",
    "phone": "9612158469",
    "address": "Paona Bazar, Imphal West, Manipur",
    "services": "Electronic Media (News)",
    "about": "Impact TV News is listed as an approved AMBI/BEG member in the Media & Creative sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m069",
    "name": "RK Nisha",
    "position": "Member",
    "company": "Bubble Beats",
    "category": "Professional Services",
    "email": "",
    "phone": "",
    "address": "Keisampat",
    "services": "Childhood/Play Programs",
    "about": "Bubble Beats is listed as an approved AMBI/BEG member in the Professional Services sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m070",
    "name": "RK Rameshwar",
    "position": "Member",
    "company": "RK Fortune",
    "category": "Construction",
    "email": "",
    "phone": "",
    "address": "Changangei",
    "services": "Construction",
    "about": "RK Fortune is listed as an approved AMBI/BEG member in the Construction sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m071",
    "name": "Robin Seram",
    "position": "Managing Director",
    "company": "Epic Films Imphal",
    "category": "Media & Creative",
    "email": "robinseram@gmail.com",
    "phone": "08974615771",
    "address": "Nongmeibung Seram Leirak, Imphal East",
    "services": "Advertising Agency & Photo-Video Production House",
    "about": "Epic Films Imphal is listed as an approved AMBI/BEG member in the Media & Creative sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m072",
    "name": "Sadokpam Itombi Singh",
    "position": "Proprietor",
    "company": "S J Plastic Agency",
    "category": "Manufacturing",
    "email": "sjplasticagency@gmail.com",
    "phone": "9612410442",
    "address": "Sagolband Sadokpam Leikai",
    "services": "Manufacturing plastic households items",
    "about": "S J Plastic Agency is listed as an approved AMBI/BEG member in the Manufacturing sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m073",
    "name": "Santosh Saikhom",
    "position": "Member",
    "company": "Santosh Electronics",
    "category": "Technology",
    "email": "",
    "phone": "",
    "address": "Moreh",
    "services": "Electronics Retail",
    "about": "Santosh Electronics is listed as an approved AMBI/BEG member in the Technology sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m074",
    "name": "Sinam Haridas Singh",
    "position": "Member",
    "company": "Eastern Motors",
    "category": "Automotive",
    "email": "",
    "phone": "",
    "address": "Mantripukhri",
    "services": "Automotive Supply",
    "about": "Eastern Motors is listed as an approved AMBI/BEG member in the Automotive sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m075",
    "name": "Sougaijam Brainy",
    "position": "Member",
    "company": "SB & Sons",
    "category": "Retail & Trading",
    "email": "",
    "phone": "",
    "address": "Moirangkhom",
    "services": "Retail/Trade",
    "about": "SB & Sons is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m076",
    "name": "Thangjam Arunkumar",
    "position": "Member",
    "company": "Arun Enterprises",
    "category": "Retail & Trading",
    "email": "",
    "phone": "",
    "address": "Chingmeirong",
    "services": "Commercial Enterprises",
    "about": "Arun Enterprises is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m077",
    "name": "Thangjam Roshan Singh",
    "position": "Director",
    "company": "AMP E SERVICES PVT LTD",
    "category": "Technology",
    "email": "roshanamp@gmail.com",
    "phone": "8132953246",
    "address": "Paona Bazar, Imphal, Manipur",
    "services": "Electronics and Mobile",
    "about": "AMP E SERVICES PVT LTD is listed as an approved AMBI/BEG member in the Technology sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m078",
    "name": "Thoudam Shanjubala Devi",
    "position": "Proprietor",
    "company": "SAS Enterprises",
    "category": "Retail & Trading",
    "email": "sharjubala@gmail.com",
    "phone": "8974053214",
    "address": "Thoubal Awang Leikai, Thoubal 795138",
    "services": "FMCG",
    "about": "SAS Enterprises is listed as an approved AMBI/BEG member in the Retail & Trading sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m079",
    "name": "Tongbram Tarunkumar",
    "position": "Proprietor",
    "company": "Kohort Design & Build",
    "category": "Construction",
    "email": "kohort.design@gmail.com",
    "phone": "8257811079",
    "address": "Singjamei Mathak Chongtham Leikai",
    "services": "Building Planning and Construction",
    "about": "Kohort Design & Build is listed as an approved AMBI/BEG member in the Construction sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  },
  {
    "id": "m080",
    "name": "Vincent Koijam",
    "position": "Director",
    "company": "Daani Hotels and Resorts Pvt Ltd",
    "category": "Healthcare",
    "email": "vincentkoijam@gmail.com",
    "phone": "8730922881",
    "address": "Thangmeiband",
    "services": "Hospitality",
    "about": "Daani Hotels and Resorts Pvt Ltd is listed as an approved AMBI/BEG member in the Healthcare sector.",
    "display": "initials",
    "photo": "",
    "logo": "",
    "verified": true,
    "approvedBy": "AMBI Directory Import"
  }
];
const blank={name:'',position:'',company:'',category:'Healthcare',email:'',phone:'',address:'',services:'',about:'',display:'initials',photo:'',logo:'',verified:true,approvedBy:'Admin'};
function initials(name,company){const source=(company||name||'AMBI').trim().split(/\s+/);return source.slice(0,2).map(s=>s[0]).join('').toUpperCase();}
function Avatar({m,big=false}){let src=m.display==='photo'?m.photo:m.display==='logo'?m.logo:'';return src?<img className={big?'avatarImg big':'avatarImg'} src={src}/>:<div className={big?'avatarMono big':'avatarMono'}>{initials(m.name,m.company)}</div>}
function readFile(file,cb){if(!file)return;const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(file)}

const profileActivity=[
 {id:'a1',type:'Advertisement',title:'Submitted business promotion banner',status:'Approved',date:'This month',approvedBy:'Committee Admin'},
 {id:'a2',type:'Event',title:'RSVP confirmed for Business Networking Evening',status:'Completed',date:'Last week',approvedBy:'AMBI'},
 {id:'a3',type:'Profile',title:'Updated digital visiting card details',status:'Completed',date:'Today',approvedBy:'Member'}
];


const seedCalendarEvents=[
 {id:'hol-jan26',title:'Republic Day',date:'2026-01-26',time:'All day',location:'India',createdBy:'Indian National Calendar',type:'National Holiday',source:'Official national holiday',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-mar03',title:'Yaoshang begins',date:'2026-03-03',time:'All day',location:'Manipur',createdBy:'Manipuri Cultural Calendar',type:'Manipuri Festival',source:'Yaoshang/Holi season',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-mar04',title:'Holi',date:'2026-03-04',time:'All day',location:'India',createdBy:'Indian Holiday Calendar',type:'Festival',source:'Indian festival calendar',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-mar26',title:'Ram Navami',date:'2026-03-26',time:'All day',location:'India',createdBy:'Indian Holiday Calendar',type:'Festival',source:'Indian festival calendar',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-apr03',title:'Good Friday',date:'2026-04-03',time:'All day',location:'India',createdBy:'Indian Holiday Calendar',type:'National/Religious Holiday',source:'Indian holiday calendar',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-apr14',title:'Cheiraoba / Sajibu Nongma Panba',date:'2026-04-14',time:'All day',location:'Manipur',createdBy:'Manipuri Cultural Calendar',type:'Manipuri Festival',source:'Meitei New Year, date may follow local lunar notification',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-may01',title:'Buddha Purnima',date:'2026-05-01',time:'All day',location:'India',createdBy:'Indian Holiday Calendar',type:'Festival',source:'Indian festival calendar',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-aug15',title:'Independence Day',date:'2026-08-15',time:'All day',location:'India',createdBy:'Indian National Calendar',type:'National Holiday',source:'Official national holiday',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-oct02',title:'Gandhi Jayanti',date:'2026-10-02',time:'All day',location:'India',createdBy:'Indian National Calendar',type:'National Holiday',source:'Official national holiday',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-oct20',title:'Dussehra / Vijayadashami',date:'2026-10-20',time:'All day',location:'India',createdBy:'Indian Holiday Calendar',type:'Festival',source:'Indian festival calendar',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-nov08',title:'Diwali / Deepavali',date:'2026-11-08',time:'All day',location:'India',createdBy:'Indian Holiday Calendar',type:'Festival',source:'Indian festival calendar',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-nov10',title:'Ningol Chakouba',date:'2026-11-10',time:'All day',location:'Manipur',createdBy:'Manipuri Cultural Calendar',type:'Manipuri Festival',source:'Meitei lunar festival, verify with local 2026 notification',attending:[],maybe:[],not:[],blocked:false},
 {id:'hol-dec25',title:'Christmas Day',date:'2026-12-25',time:'All day',location:'India',createdBy:'Indian Holiday Calendar',type:'National/Religious Holiday',source:'Indian holiday calendar',attending:[],maybe:[],not:[],blocked:false},
 {id:'beg-jun24',title:'BEG Business Networking Evening',date:'2026-06-24',time:'4:00 PM',location:'BEG Office',createdBy:'AMBI Members',type:'Member Event',source:'AMBI event',attending:[],maybe:[],not:[],blocked:false},
 {id:'beg-jun28',title:'Member Directory Review Meet',date:'2026-06-28',time:'11:00 AM',location:'Imphal',createdBy:'AMBI Members',type:'Member Event',source:'AMBI event',attending:[],maybe:[],not:[],blocked:false}
];

const notificationSeed=[
 {t:'Calendar is open for members',d:'Approved members can now create calendar items directly. Admins can remove inappropriate events.'},
 {t:'2026 holiday calendar installed',d:'Indian national holidays and key Manipuri cultural observances are listed in Calendar.'},
 {t:'Directory loaded',d:'All 80 approved AMBI/BEG members are available in the directory.'}
];
function dateParts(iso){const [y,m,d]=String(iso).split('-').map(Number);return {year:y,month:m-1,day:d}}
function monthName(i){return ['January','February','March','April','May','June','July','August','September','October','November','December'][i]}
function eventKeyDate(ev){return ev.date || `2026-06-${String(ev.day||1).padStart(2,'0')}`}

function toAppMember(row){
  return {
    id: row.id,
    name: row.full_name || '',
    position: row.title || '',
    company: row.company_name || '',
    category: row.category || 'Professional Services',
    email: row.email || '',
    phone: row.phone || '',
    website: row.website || '',
    address: [row.city, row.state].filter(Boolean).join(', '),
    services: row.bio || row.category || '',
    about: row.bio || `${row.company_name || row.full_name || 'This member'} is listed as an approved AMBI/BEG member.`,
    display: row.profile_photo_url ? 'photo' : row.logo_url ? 'logo' : 'initials',
    photo: row.profile_photo_url || '',
    logo: row.logo_url || '',
    verified: row.approved === true,
    approvedBy: 'AMBI Supabase Directory'
  };
}


function accountToMember(row){
  return {
    id: row.member_id || row.id,
    name: row.full_name || '',
    position: row.title || '',
    company: row.company_name || '',
    category: row.category || 'Professional Services',
    email: row.email || '',
    phone: row.phone || '',
    website: row.website || '',
    address: [row.city, row.state].filter(Boolean).join(', '),
    services: row.bio || row.category || '',
    about: row.bio || `${row.company_name || row.full_name || 'This member'} is listed as an approved AMBI/BEG member.`,
    display: row.profile_photo_url ? 'photo' : row.logo_url ? 'logo' : 'initials',
    photo: row.profile_photo_url || '',
    logo: row.logo_url || '',
    verified: true,
    approvedBy: 'AMBI Member Login'
  };
}

function isSessionValid(account){
  if(!account?.session_token || !account?.expires_at)return false;
  return new Date(account.expires_at).getTime() > Date.now();
}

function adminRank(role){
  return {member:0,level1_admin:1,admin:1,level2_admin:2,super_admin:3}[role] || 0;
}
function canAccessManagement(role){return adminRank(role)>=1}
function canViewAccountStatus(role){return adminRank(role)>=2}
function canCreateMemberLogin(role){return adminRank(role)>=2}
function canAssignAdminRoles(role){return adminRank(role)>=3}
function canModerate(role){return adminRank(role)>=1}
function roleLabel(role){
  return role==='super_admin'?'Super Admin':role==='level2_admin'?'Level 2 Admin':role==='level1_admin'||role==='admin'?'Level 1 Admin':'Member';
}

function toAppEvent(row){
  return {
    id: row.id,
    title: row.title || 'Untitled Event',
    date: row.event_date || '',
    time: row.event_time || 'All day',
    location: row.location || 'AMBI',
    type: row.event_type || 'Member Event',
    createdBy: row.created_by_name || 'Verified Member',
    source: 'Supabase events table',
    attending: Array.isArray(row.attending) ? row.attending : [],
    maybe: Array.isArray(row.maybe) ? row.maybe : [],
    not: Array.isArray(row.not_attending) ? row.not_attending : [],
    blocked: row.blocked === true,
    blockedBy: row.blocked_by || ''
  };
}

function toEventRow(ev){
  return {
    title: ev.title || 'Untitled Event',
    description: ev.description || ev.source || '',
    event_date: ev.date || eventKeyDate(ev),
    event_time: ev.time || 'All day',
    location: ev.location || 'AMBI',
    event_type: ev.type || 'Member Event',
    created_by_name: ev.createdBy || 'Verified Member',
    attending: ev.attending || [],
    maybe: ev.maybe || [],
    not_attending: ev.not || [],
    blocked: ev.blocked === true,
    blocked_by: ev.blockedBy || null
  };
}

function toAppPost(row){
  return {
    id: row.id || `local-${Date.now()}`,
    kind: row.kind || 'Notice',
    title: row.title || 'Member notice',
    summary: row.summary || '',
    details: row.details || '',
    asset: row.asset_src ? {name: row.asset_name || 'Attachment', type: row.asset_type || '', src: row.asset_src} : null,
    createdBy: row.created_by_name || row.username || 'Verified Member',
    company: row.company || '',
    createdAt: row.created_at || new Date().toISOString(),
    pinned: row.pinned === true,
    blocked: row.blocked === true
  };
}

const seedPosts=[
  {id:'seed-post-1',kind:'Notice',title:'Welcome to the AMBI member notice board',summary:'Member announcements, advertisements and important updates appear here immediately after posting.',details:'Admins can block or delete unsuitable posts.',createdBy:'AMBI Admin',company:'Business Excellence Group',createdAt:'2026-06-01T09:00:00Z',pinned:true,blocked:false},
  {id:'seed-post-2',kind:'Event',title:'Calendar events can be featured here',summary:'Important events can guide members to the shared calendar and RSVP page.',details:'Open Calendar to view details and RSVP.',createdBy:'AMBI Calendar',company:'AMBI',createdAt:'2026-06-02T09:00:00Z',pinned:false,blocked:false}
];

function mergeCalendarEvents(staticEvents, backendEvents){
  const byId = new Map();
  [...staticEvents, ...backendEvents].forEach(ev => {
    if (ev && ev.id) byId.set(ev.id, ev);
  });
  return [...byId.values()].sort((a,b)=>String(eventKeyDate(a)).localeCompare(String(eventKeyDate(b))));
}

function App(){
  const [page,setPageRaw]=useState('home');
  const [drawer,setDrawer]=useState(false);
  const [members,setMembers]=useState(()=>{try{return JSON.parse(localStorage.getItem('ambiMembersRealV2'))||seedMembers}catch{return seedMembers}});
  const [query,setQuery]=useState('');
  const [cat,setCat]=useState('All');
  const [selected,setSelected]=useState(null);
  const [form,setForm]=useState(blank);
  const [editing,setEditing]=useState(null);
  const [toast,setToast]=useState('');
  const [currentAccount,setCurrentAccount]=useState(()=>{try{const saved=JSON.parse(localStorage.getItem('ambiCurrentAccountV19'));return isSessionValid(saved)?saved:null}catch{return null}});
  const loggedIn=!!currentAccount;
  const currentRole=currentAccount?.role || 'member';
  const isManagementUser=canAccessManagement(currentRole);
  const [contacts,setContacts]=useState(()=>{try{return JSON.parse(localStorage.getItem('ambiContactsV18'))||[]}catch{return []}});
  const [calendarEvents,setCalendarEvents]=useState(seedCalendarEvents);
  const [memberPosts,setMemberPosts]=useState(()=>{try{return JSON.parse(localStorage.getItem('ambiMemberPostsV20'))||seedPosts}catch{return seedPosts}});
  const pageRef=useRef(page);
  const lastBackRef=useRef(0);
  const historyReadyRef=useRef(false);

  const setPage=(next)=>{setPageRaw(prev=>{const target=typeof next==='function'?next(prev):next;if(target&&target!==prev){pageRef.current=target;if(historyReadyRef.current&&typeof window!=='undefined'){window.history.pushState({ambiPage:target},'',`${window.location.pathname}${window.location.search}#${target}`)}}return target||prev})};

  useEffect(()=>{pageRef.current=page},[page]);
  useEffect(()=>{if(typeof window==='undefined')return;if(!window.history.state?.ambiPage){window.history.replaceState({ambiPage:'home'},'',`${window.location.pathname}${window.location.search}#home`)}historyReadyRef.current=true;const onPop=()=>{const target=window.history.state?.ambiPage||'home';pageRef.current=target;setPageRaw(target)};window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[]);

  useEffect(()=>{if(!currentAccount)return;const member=accountToMember(currentAccount);setSelected(member);setPage('home')},[]);

  useEffect(()=>{if(!supabaseConfigured||!supabase){if(import.meta.env.DEV){console.warn('AMBI Supabase is not configured. Check .env.local.')}return}let active=true;supabase.auth.getSession().then(({error})=>{if(!active)return;if(error&&import.meta.env.DEV){console.warn('AMBI Supabase session check failed:',error.message)}});const {data}=supabase.auth.onAuthStateChange(()=>{});return()=>{active=false;data?.subscription?.unsubscribe?.()}},[]);

  useEffect(()=>{let active=true;async function loadMembers(){if(!loggedIn||!currentAccount?.session_token)return;if(!supabaseConfigured||!supabase)return;try{const {data,error}=await supabase.rpc('ambi_get_members',{p_session_token:currentAccount.session_token});if(error)throw error;if(!active)return;const mapped=(data||[]).map(toAppMember).filter(m=>m.name);if(mapped.length){setMembers(mapped);const currentMember=mapped.find(m=>m.id===currentAccount.member_id)||accountToMember(currentAccount);setSelected(currentMember);localStorage.setItem('ambiMembersRealV2',JSON.stringify(mapped));}}catch(error){if(import.meta.env.DEV){console.warn('AMBI member directory load failed. Using local fallback.',error?.message||error);}}}loadMembers();return()=>{active=false}},[loggedIn,currentAccount?.session_token]);

  useEffect(()=>{let active=true;async function loadEvents(){if(!loggedIn||!currentAccount?.session_token)return;if(!supabaseConfigured||!supabase)return;try{const {data,error}=await supabase.rpc('ambi_get_events',{p_session_token:currentAccount.session_token});if(error)throw error;if(!active)return;const mapped=(data||[]).map(toAppEvent).filter(ev=>ev.title&&ev.date);setCalendarEvents(mergeCalendarEvents(seedCalendarEvents,mapped));}catch(error){if(import.meta.env.DEV){console.warn('AMBI events load failed. Using built-in calendar fallback.',error?.message||error);}}}loadEvents();return()=>{active=false}},[loggedIn,currentAccount?.session_token]);

  useEffect(()=>{let active=true;async function loadPosts(){if(!loggedIn||!currentAccount?.session_token)return;if(!supabaseConfigured||!supabase)return;try{const {data,error}=await supabase.rpc('ambi_get_posts',{p_session_token:currentAccount.session_token});if(error)throw error;if(!active)return;const mapped=(data||[]).map(toAppPost).filter(p=>p.title&&!p.blocked);setMemberPosts(mapped.length?mapped:seedPosts);localStorage.setItem('ambiMemberPostsV20',JSON.stringify(mapped.length?mapped:seedPosts));}catch(error){if(import.meta.env.DEV){console.warn('AMBI posts load failed. Using local notice board fallback.',error?.message||error);}}}loadPosts();return()=>{active=false}},[loggedIn,currentAccount?.session_token]);

  useEffect(()=>{let handle;CapacitorApp.addListener('backButton',()=>{const current=pageRef.current;if(current&&current!=='home'){setPage('home');return}const now=Date.now();if(now-lastBackRef.current<2000){CapacitorApp.exitApp();return}lastBackRef.current=now;setToast('Press back again to exit')}).then(h=>{handle=h}).catch(()=>{});return()=>{if(handle&&handle.remove)handle.remove()}},[]);
  useEffect(()=>localStorage.setItem('ambiMembersRealV2',JSON.stringify(members)),[members]);
  useEffect(()=>{if(currentAccount)localStorage.setItem('ambiCurrentAccountV19',JSON.stringify(currentAccount));else localStorage.removeItem('ambiCurrentAccountV19')},[currentAccount]);
  useEffect(()=>localStorage.setItem('ambiContactsV18',JSON.stringify(contacts)),[contacts]);
  useEffect(()=>localStorage.setItem('ambiMemberPostsV20',JSON.stringify(memberPosts)),[memberPosts]);
  useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(''),2400);return()=>clearTimeout(t)}},[toast]);

  const filtered=useMemo(()=>members.filter(m=>(cat==='All'||m.category===cat)&&(`${m.name} ${m.company} ${m.category} ${m.services}`.toLowerCase().includes(query.toLowerCase()))),[members,cat,query]);
  const sectors=SECTORS.map(s=>({name:s,count:s==='All'?members.length:members.filter(m=>m.category===s).length}));

  async function handleMemberLogin(username,password){
    if(!supabaseConfigured||!supabase){throw new Error('Supabase is not configured on this build.');}
    const {data,error}=await supabase.rpc('ambi_member_login',{p_username:username.trim(),p_password:password});
    if(error)throw error;
    const row=Array.isArray(data)?data[0]:data;
    if(!row?.session_token)throw new Error('Invalid username or password.');
    setCurrentAccount(row);
    const member=accountToMember(row);
    setSelected(member);
    setMembers(ms=>ms.some(m=>m.id===member.id)?ms:[member,...ms]);
    setToast(row.must_change_password?'Login successful. Please change your temporary password soon.':'Login successful');
    setPage('home');
  }

  async function handleChangePassword(currentPassword,newPassword){
    if(!currentAccount?.account_id)throw new Error('You need to log in first.');
    const {data,error}=await supabase.rpc('ambi_change_password',{p_account_id:currentAccount.account_id,p_current_password:currentPassword,p_new_password:newPassword});
    if(error)throw error;
    if(!data)throw new Error('Current password is incorrect.');
    const updated={...currentAccount,must_change_password:false};
    setCurrentAccount(updated);
    setToast('Password changed successfully');
  }

  function saveMember(){if(!form.name||!form.company){setToast('Name and company are required');return} if(editing){setMembers(ms=>ms.map(m=>m.id===editing?{...form,id:editing}:m));setToast('Member profile updated')}else{setMembers(ms=>[{...form,id:'m'+Date.now()},...ms]);setToast('New member saved to directory')}setForm(blank);setEditing(null);setPage('directory')}
  function edit(m){setForm(m);setEditing(m.id);setPage('management')}
  function del(id){setMembers(ms=>ms.filter(m=>m.id!==id));setToast('Member deleted from local directory')}
  function openProfile(m){if(selected?.id&&m.id!==selected.id){setContacts(cs=>cs.some(c=>c.id===m.id)?cs:[{id:m.id,name:m.name,company:m.company,date:new Date().toLocaleDateString()},...cs].slice(0,8));}setSelected(m);setPage('profile')}
  async function createMemberPost(draft){
    if(!currentAccount?.session_token)throw new Error('Please log in first.');
    if(supabaseConfigured&&supabase){
      const {data,error}=await supabase.rpc('ambi_create_post',{
        p_session_token:currentAccount.session_token,
        p_kind:draft.kind,
        p_title:draft.title,
        p_summary:draft.summary,
        p_details:draft.details||'',
        p_asset_name:draft.asset?.name||'',
        p_asset_type:draft.asset?.type||'',
        p_asset_src:draft.asset?.src||''
      });
      if(error)throw error;
      const saved=toAppPost(Array.isArray(data)?data[0]:data);
      setMemberPosts(list=>[saved,...list.filter(p=>p.id!==saved.id)]);
      setToast('Posted to the member notice board');
      setPage('home');
      return saved;
    }
    const local={...draft,id:`local-${Date.now()}`,createdBy:selected?.name||currentAccount.username||'Member',company:selected?.company||'',createdAt:new Date().toISOString(),pinned:false,blocked:false};
    setMemberPosts(list=>[local,...list]);
    setToast('Posted locally to the notice board');
    setPage('home');
    return local;
  }
  async function blockPost(id){
    if(!canModerate(currentRole)){setToast('Admin only');return;}
    if(supabaseConfigured&&supabase&&currentAccount?.session_token&&String(id).length>20){
      const {error}=await supabase.rpc('ambi_block_post',{p_session_token:currentAccount.session_token,p_post_id:id});
      if(error){setToast(error.message||'Could not block post');return;}
    }
    setMemberPosts(list=>list.filter(p=>p.id!==id));
    setToast('Post blocked');
  }
  async function deletePost(id){
    if(!canModerate(currentRole)){setToast('Admin only');return;}
    if(supabaseConfigured&&supabase&&currentAccount?.session_token&&String(id).length>20){
      const {error}=await supabase.rpc('ambi_delete_post',{p_session_token:currentAccount.session_token,p_post_id:id});
      if(error){setToast(error.message||'Could not delete post');return;}
    }
    setMemberPosts(list=>list.filter(p=>p.id!==id));
    setToast('Post deleted');
  }
  function logout(){setCurrentAccount(null);setSelected(null);setContacts([]);setCalendarEvents(seedCalendarEvents);setToast('Logged out successfully');setPage('login')}

  const locked=!loggedIn;

  return <div className="app"><header className="topbar"><button className="iconBtn" onClick={()=>setDrawer(true)}><Menu/></button><button className="brand brandButton" onClick={()=>loggedIn?setPage('home'):setPage('login')} aria-label="Go to Home"><img src="/ambi-logo.png"/><div><strong>AMBI</strong><small>Business Excellence Group</small></div></button><nav><button className={page==='home'?'active':''} onClick={()=>loggedIn?setPage('home'):setPage('login')}>Home</button><button className={page==='about'?'active':''} onClick={()=>setPage('about')}>About</button><button className={page==='directory'?'active':''} onClick={()=>loggedIn?setPage('directory'):setPage('login')}>Directory</button><button className={(page==='calendar'||page==='reminder')?'active':''} onClick={()=>loggedIn?setPage('calendar'):setPage('login')}>Calendar</button></nav><button className="notif" onClick={()=>loggedIn?setPage('notifications'):setPage('login')}><Bell/><span>{loggedIn?3:0}</span></button></header>{drawer&&<div className="overlay" onClick={()=>setDrawer(false)}><aside className="drawer" onClick={e=>e.stopPropagation()}><div className="drawerHead"><img src="/ambi-logo.png"/><div><b>AMBI</b><small>{loggedIn?currentAccount?.role||'Member':'Login required'}</small></div><button onClick={()=>setDrawer(false)}><X/></button></div>{['home','about','directory','calendar','submit','notifications','profile',...(isManagementUser?['management']:[])].map(p=><button key={p} className={(page===p||(p==='calendar'&&page==='reminder'))?'active':''} onClick={()=>{if(p==='about'||loggedIn){setPage(p)}else{setPage('login')}setDrawer(false)}}>{p==='calendar'?'Calendar':p==='management'?'Admin Settings':p[0].toUpperCase()+p.slice(1)}</button>)}</aside></div>}<main>{locked&&page!=='about'?<LoginPage onLogin={handleMemberLogin}/>:<>{page==='login'&&<LoginPage onLogin={handleMemberLogin}/>} {page==='home'&&<HomePage members={members} calendarEvents={calendarEvents} posts={memberPosts} setPage={setPage} openProfile={openProfile} currentRole={currentRole} onBlockPost={blockPost} onDeletePost={deletePost}/>} {page==='directory'&&<Directory members={members} sectors={sectors} cat={cat} setCat={setCat} query={query} setQuery={setQuery} openProfile={openProfile}/>} {page==='about'&&<AboutPage/>} {page==='profile'&&<Profile member={selected} edit={edit} contacts={contacts} loggedIn={loggedIn} logout={logout} login={()=>setPage('login')} activity={profileActivity} currentAccount={currentAccount} changePassword={handleChangePassword}/>} {page==='management'&&isManagementUser&&<Management members={members} events={calendarEvents} setPage={setPage} currentAccount={currentAccount}/>} {page==='management'&&!isManagementUser&&<HomePage members={members} calendarEvents={calendarEvents} posts={memberPosts} setPage={setPage} openProfile={openProfile} currentRole={currentRole} onBlockPost={blockPost} onDeletePost={deletePost}/>} {page==='submit'&&<SubmitContent onCreatePost={createMemberPost} currentMember={selected}/>} {(page==='calendar'||page==='reminder')&&<CalendarPage openProfile={openProfile} members={members} events={calendarEvents} setEvents={setCalendarEvents} currentMember={selected} currentAccount={currentAccount}/>} {page==='notifications'&&<Notifications events={calendarEvents} setPage={setPage}/>}</>}</main><footer className="avit"><p>DESIGNED & DEVELOPED BY</p><h2>Av<span>i</span>T Solutions</h2><h3>Websites • Mobile Apps • Custom Software • Audio Visual Complete Solutions</h3><b>www.avitsolutions.tech</b></footer><div className="bottom"><button onClick={()=>loggedIn?setPage('home'):setPage('login')}><Home/>Home</button><button onClick={()=>loggedIn?setPage('directory'):setPage('login')}><Users/>Directory</button><button className="plus" aria-label="Submit" onClick={()=>loggedIn?setPage('submit'):setPage('login')}><Plus/></button><button onClick={()=>loggedIn?setPage('calendar'):setPage('login')}><CalendarDays/>Calendar</button><button onClick={()=>loggedIn?setPage('profile'):setPage('login')}><UserCircle/>Profile</button></div>{toast&&<div className="toast"><CheckCircle2/>{toast}</div>}</div>
}

function LoginPage({onLogin}){
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  async function submit(e){
    e.preventDefault();
    setError('');
    if(!username.trim()||!password){setError('Enter your AMBI username and password.');return;}
    setBusy(true);
    try{await onLogin(username,password)}catch(err){setError(err?.message||'Login failed. Ask admin to check your account.')}finally{setBusy(false)}
  }
  return <><section className="pageHero profileLogin"><p className="eyebrow">Members only</p><h1>AMBI member login</h1><p>This APK can be opened by anyone, but live directory, calendar, RSVP and submissions only unlock for admin-approved AMBI members.</p></section><section className="builder submitClean"><form onSubmit={submit}><label>Username / Member ID<input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Example: hemanta" autoCapitalize="none"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Temporary or changed password"/></label><button type="submit" disabled={busy}><UserCircle/>{busy?'Checking...':'Log in'}</button>{error&&<div className="successMsg">{error}</div>}<p className="mutedText">No public sign-up. Admin creates your username and temporary password. Contact AMBI admin if you need access or password reset.</p></form><aside className="preview"><h2>Controlled access</h2><div className="contentPreviewCard"><span>Approved members only</span><h3>APK sharing is safe</h3><p>People may install the APK, but without an approved username and password they cannot access live member data.</p><small>Admin-controlled login</small></div></aside></section></>
}

function HomePage({members,calendarEvents=[],posts=[],setPage,openProfile,currentRole='member',onBlockPost,onDeletePost}){
  const [activePost,setActivePost]=useState(null);
  const visiblePosts=(posts||[]).filter(p=>!p.blocked).sort((a,b)=>(b.pinned===true)-(a.pinned===true)||String(b.createdAt||'').localeCompare(String(a.createdAt||'')));
  const featuredPosts=visiblePosts.slice(0,6);
  const upcoming=(calendarEvents||[]).filter(e=>!e.blocked).slice(0,5);
  const isAdmin=canModerate(currentRole);
  const sectorCount=new Set(members.map(m=>m.category)).size;
  const openPost=(post)=>setActivePost(post);
  return <>
    <style>{`
      .homeCompactHero{max-width:1180px;margin:22px auto 14px;padding:28px 34px;border-radius:28px;background:linear-gradient(135deg,#173d2a,#172f4d 82%);color:#fff;display:grid;grid-template-columns:1fr auto;gap:22px;align-items:center;box-shadow:0 20px 45px rgba(0,0,0,.12)}
      .homeCompactHero .eyebrow{color:#c6a84d;margin:0 0 8px}.homeCompactHero h1{font-size:clamp(32px,5vw,54px);line-height:.95;margin:0 0 10px;max-width:760px}.homeCompactHero p{max-width:760px;color:rgba(255,255,255,.82);font-size:15px;line-height:1.55;margin:0 0 16px}.homeCompactHero .heroActions{margin:0;display:flex;gap:10px;flex-wrap:wrap}.homeCompactHero .heroActions button{min-height:42px;padding:10px 16px;border-radius:14px}.homeHeroMiniCard{width:150px;border-radius:22px;background:rgba(255,255,255,.92);color:#214e33;text-align:center;padding:18px 14px}.homeHeroMiniCard img{width:72px;height:72px;object-fit:contain}.homeHeroMiniCard b{display:block;font-size:38px;line-height:1}.homeHeroMiniCard span{font-weight:800;font-size:11px;color:#647269}.homeQuickStats{max-width:1180px;margin:0 auto 14px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.homeQuickStats div{background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:18px;padding:12px 15px;box-shadow:0 10px 28px rgba(0,0,0,.06)}.homeQuickStats b{display:block;font-size:24px;color:#285d3b}.homeQuickStats span{display:block;font-size:12px;font-weight:800;color:#66736b}.noticeBoardPanel{max-width:1180px;margin:18px auto;padding:24px;border-radius:26px;background:#fff;border:1px solid rgba(0,0,0,.07);box-shadow:0 16px 42px rgba(0,0,0,.07)}.noticeBoardGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.noticeCardWide{width:100%;min-height:156px;border:1px solid rgba(0,0,0,.08);border-radius:22px;background:linear-gradient(180deg,#fff,#fbfaf6);padding:18px;text-align:left;display:grid;grid-template-columns:96px 1fr auto;gap:16px;align-items:center;cursor:pointer;box-shadow:0 10px 24px rgba(0,0,0,.04);transition:.18s ease}.noticeCardWide:hover{transform:translateY(-2px);box-shadow:0 16px 32px rgba(0,0,0,.08);border-color:#c6a84d}.noticeBadge{font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:.14em;color:#9a7a22;background:#f7f0d8;border-radius:999px;padding:8px 10px;display:inline-flex;justify-content:center;align-items:center;text-align:center}.noticeCardWide h3{font-size:22px;line-height:1.05;margin:0 0 8px;color:#16241d}.noticeCardWide p{font-size:14px;line-height:1.45;color:#647269;margin:0 0 10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.noticeMeta{display:block;font-size:12px;font-weight:800;color:#285d3b}.noticeThumb{width:76px;height:76px;border-radius:18px;object-fit:cover;background:#eef5ef}.noticeOpen{font-size:12px;font-weight:900;color:#285d3b;white-space:nowrap}.postModalBackdrop{position:fixed;inset:0;background:rgba(7,16,12,.55);z-index:80;display:flex;align-items:center;justify-content:center;padding:18px}.postModal{width:min(760px,96vw);max-height:90vh;overflow:auto;background:#fff;border-radius:30px;padding:28px;box-shadow:0 28px 80px rgba(0,0,0,.28)}.postModalHead{display:flex;justify-content:space-between;gap:16px;align-items:start}.postModal h2{font-size:clamp(30px,5vw,50px);line-height:.98;margin:8px 0 12px}.postModal p{font-size:16px;line-height:1.6;color:#516058}.postModal img{width:100%;max-height:380px;object-fit:cover;border-radius:22px;margin:14px 0}.postModalActions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.postModalActions button,.postClose{border:0;border-radius:14px;background:#285d3b;color:white;font-weight:900;padding:10px 14px}.postClose{background:#f0f4ef;color:#285d3b}.homeCalendarList{display:grid;gap:10px}.homeCalendarList .notice{margin:0}.homeFeaturedMembers{margin-bottom:80px}@media(max-width:820px){.homeCompactHero{grid-template-columns:1fr;padding:22px;margin:14px 12px}.homeHeroMiniCard{display:none}.homeQuickStats{grid-template-columns:repeat(2,1fr);margin:0 12px}.noticeBoardPanel{margin:14px 12px;padding:18px}.noticeBoardGrid{grid-template-columns:1fr}.noticeCardWide{grid-template-columns:1fr auto;gap:10px}.noticeBadge{justify-self:start}.noticeThumb{display:none}.noticeOpen{align-self:end}.homeCompactHero h1{font-size:35px}}
    `}</style>
    <section className="homeCompactHero">
      <div>
        <p className="eyebrow">Business Excellence Group • Since 2017</p>
        <h1>AMBI member network.</h1>
        <p>Notices, opportunities, business posts and calendar updates in one members-only space.</p>
        <div className="heroActions"><button onClick={()=>setPage('directory')}>Explore Directory <ChevronRight/></button><button onClick={()=>setPage('submit')}>Post Notice <Plus/></button></div>
      </div>
      <div className="homeHeroMiniCard"><img src="/ambi-logo.png"/><b>{members.length}</b><span>approved members</span></div>
    </section>
    <section className="homeQuickStats"><div><b>{members.length}</b><span>Members</span></div><div><b>{sectorCount}</b><span>Sectors</span></div><div><b>{visiblePosts.length}</b><span>Posts</span></div><div><b>{calendarEvents.filter(e=>!e.blocked).length}</b><span>Events</span></div></section>
    <section className="noticeBoardPanel">
      <div className="sectionHead"><div><p className="eyebrow">Live notice board</p><h2>Member posts, advertisements and important updates</h2></div><button onClick={()=>setPage('submit')}><Plus/>Post</button></div>
      <div className="noticeBoardGrid">{featuredPosts.length?featuredPosts.map(post=><button className="noticeCardWide" key={post.id} onClick={()=>openPost(post)}><span className="noticeBadge">{post.kind}</span><div><h3>{post.title}</h3><p>{post.summary}</p><small className="noticeMeta">{post.createdBy}{post.company?` • ${post.company}`:''}</small></div>{post.asset&&post.asset.type?.startsWith('image/')?<img className="noticeThumb" src={post.asset.src}/>:<span className="noticeOpen">View details</span>}</button>):<div className="contentPreviewCard"><span>Notice Board</span><h3>No member posts yet</h3><p>Member notices and advertisements will appear here immediately after posting.</p></div>}</div>
    </section>
    <section className="panel"><div className="sectionHead"><h2>Upcoming calendar items</h2><button onClick={()=>setPage('calendar')}>Open Calendar</button></div><div className="homeCalendarList">{upcoming.map(ev=><div className="notice" key={ev.id}><CalendarDays/><div><h3>{ev.title}</h3><p>{eventKeyDate(ev)} · {ev.time} · {ev.location}</p></div></div>)}</div></section>
    <section className="panel homeFeaturedMembers"><div className="sectionHead"><h2>Featured members</h2><button onClick={()=>setPage('directory')}>View all</button></div><div className="memberGrid">{members.slice(0,4).map(m=><MemberCard key={m.id} m={m} openProfile={openProfile}/>)}</div></section>
    {activePost&&<div className="postModalBackdrop" onClick={()=>setActivePost(null)}><article className="postModal" onClick={e=>e.stopPropagation()}><div className="postModalHead"><span className="noticeBadge">{activePost.kind}</span><button className="postClose" onClick={()=>setActivePost(null)}>Close</button></div><h2>{activePost.title}</h2><p>{activePost.summary}</p>{activePost.asset&&activePost.asset.type?.startsWith('image/')&&<img src={activePost.asset.src}/>} {activePost.asset&&!activePost.asset.type?.startsWith('image/')&&<p><b>Attachment:</b> {activePost.asset.name}</p>} {activePost.details&&<p>{activePost.details}</p>}<small className="noticeMeta">Posted by {activePost.createdBy}{activePost.company?` • ${activePost.company}`:''}</small><div className="postModalActions">{activePost.kind==='Event Notice'&&<button onClick={()=>{setActivePost(null);setPage('calendar')}}>Open Calendar</button>}{isAdmin&&<><button onClick={()=>{onBlockPost?.(activePost.id);setActivePost(null)}}>Block</button><button onClick={()=>{onDeletePost?.(activePost.id);setActivePost(null)}}>Delete</button></>}</div></article></div>}
  </>}

function AboutPage(){return <><section className="pageHero"><p className="eyebrow">About the Business Excellence Group</p><h1>Built from a collective voice for business progress.</h1><p>The Business Excellence Group was created in 2017 as a common platform for young emerging business establishments, entrepreneurs and professionals to share ideas, strengthen relationships and give meaningful direction toward greater goals.</p></section><section className="stats"><div><b>2017</b><span>Founded</span></div><div><b>BEG</b><span>Registered Society, Manipur</span></div><div><b>15+</b><span>Business Sectors</span></div><div><b>SYNERGY</b><span>Business Summit</span></div></section><section className="panel story"><h2>Our journey</h2><p>In a short span of time, BEG has emerged as a forward-thinking and progressive organisation in the trade and commerce ecosystem. Government departments, institutions, trade bodies and prominent establishments recognise BEG as a growing collective of first-generation business enterprises, entrepreneurs and professionals.</p><p>What started as a rendezvous to share ideas and experiences soon grew into a vibrant network. Members represent diverse sectors including manufacturing, hospitality, healthcare, education, e-commerce, retail, automobiles, real estate, construction, IT, finance, cosmetics, FMCG, food and beverage and more.</p></section><section className="panel story"><h2>Community and economic engagement</h2><p>BEG has supported humanitarian initiatives from flood relief to COVID-19 assistance, including the distribution of food and essential items to children’s homes, de-addiction centres and differently abled centres.</p><p>To strengthen economic relationships, BEG has participated in national and international conclaves. SYNERGY, a business summit with Myanmar business delegates, created an important platform for dialogue between enterprises of Manipur and neighbouring regions.</p></section></>}

function Directory({members,sectors,cat,setCat,query,setQuery,openProfile}){
  const [activeCategory,setActiveCategory]=useState(null);
  const categoryCards=useMemo(()=>[...sectors].sort((a,b)=>a.name==='All'?-1:b.name==='All'?1:a.name.localeCompare(b.name)),[sectors]);
  const selectedName=activeCategory||'All';
  const categoryMembers=useMemo(()=>members.filter(m=>(selectedName==='All'||m.category===selectedName)&&(`${m.name} ${m.company} ${m.category} ${m.services}`.toLowerCase().includes(query.toLowerCase()))),[members,selectedName,query]);
  const openCategory=(name)=>{setActiveCategory(name);setCat(name);setQuery('');window.scrollTo({top:0,behavior:'smooth'});};
  const backToCategories=()=>{setActiveCategory(null);setCat('All');setQuery('');window.scrollTo({top:0,behavior:'smooth'});};
  if(activeCategory){return <><section className="pageHero directorySectionHero"><button className="backToCategories" onClick={backToCategories}>← Back to categories</button><p className="eyebrow">{activeCategory==='All'?'All categories':activeCategory}</p><h1><span className="directoryHeroIcon">{CATEGORY_ICONS[activeCategory]||'📋'}</span>{activeCategory==='All'?'All Members':activeCategory}</h1><p>{categoryMembers.length} approved member{categoryMembers.length===1?'':'s'} listed in this section.</p><div className="search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Search ${activeCategory==='All'?'all members':activeCategory}...`}/></div></section><section className="memberGrid wide directoryMemberList">{categoryMembers.map(m=><MemberCard key={m.id} m={m} openProfile={openProfile}/>)}</section>{categoryMembers.length===0&&<div className="empty">No members found in this category. Try another search.</div>}</>}
  return <><section className="pageHero directoryLandingHero"><p className="eyebrow">AMBI real member directory</p><h1>Browse approved BEG members by category.</h1><p>Choose a business sector to open its member list. All categories are organized alphabetically after All.</p><div className="search"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search all 80 members..."/></div></section>{query&&<section className="memberGrid wide directorySearchPreview">{categoryMembers.map(m=><MemberCard key={m.id} m={m} openProfile={openProfile}/>)}</section>}<section className="sectors directoryCategoryGrid">{categoryCards.map(s=><button key={s.name} className={cat===s.name?'active':''} onClick={()=>openCategory(s.name)}><span className="sectorIcon">{CATEGORY_ICONS[s.name]||'📋'}</span><b>{s.name}</b><span>{s.count} member{s.count===1?'':'s'}</span></button>)}</section></>}

function MemberCard({m,openProfile}){return <button className="memberCard" onClick={()=>openProfile(m)}><Avatar m={m}/><div><h3>{m.name}</h3><p>{m.company}</p><span>{m.category}</span><small><ShieldCheck/> Verified Member</small></div><ChevronRight/></button>}

function PasswordChangeBox({currentAccount,changePassword}){
  const [currentPassword,setCurrentPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const [msg,setMsg]=useState('');
  const [busy,setBusy]=useState(false);
  async function submit(e){e.preventDefault();setMsg('');if(!newPassword||newPassword.length<6){setMsg('New password must be at least 6 characters.');return;}setBusy(true);try{await changePassword(currentPassword,newPassword);setCurrentPassword('');setNewPassword('');setMsg('Password updated.')}catch(err){setMsg(err?.message||'Password change failed.')}finally{setBusy(false)}}
  return <div className="panel profileMiniPanel"><p className="eyebrow">Account</p><h2>{currentAccount?.must_change_password?'Change temporary password':'Password'}</h2><form onSubmit={submit}><label>Current password<input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)}/></label><label>New password<input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)}/></label><button type="submit" disabled={busy}><Save/>{busy?'Saving...':'Change password'}</button>{msg&&<small>{msg}</small>}</form></div>
}

function Profile({member,edit,contacts=[],loggedIn=true,logout,login,activity=[],currentAccount,changePassword}){if(!loggedIn){return <section className="pageHero profileLogin"><p className="eyebrow">Member profile</p><h1>You are logged out.</h1><p>Log in to view your name, details, visiting card, contacts, connections and activity history.</p><button onClick={login}><UserCircle/> Log in as member</button></section>}if(!member)return <section className="pageHero"><h1>Profile not found</h1></section>;const history=[...activity,{id:'profile-update',type:'Profile',title:'Digital visiting card ready',status:'Completed',date:'Today',approvedBy:member.approvedBy||'Committee Admin'}];const ads=history.filter(h=>/ad|advertisement|promotion|poster|announcement/i.test(`${h.type} ${h.title}`));return <><section className="profileCover profileCoverClean"><Avatar m={member} big/><div className="profileTitleBlock"><p className="eyebrow">My verified profile</p><h1>{member.name}</h1><p>{member.position||'Member'} • {member.company}</p><p className="profileApproved">Verified by {member.approvedBy||'Committee Admin'}</p></div><button className="logoutBtn" onClick={logout}>Logout</button></section><section className="profileDashboard"><div className="profileMain"><div className="panel profileDetailsCard"><div className="sectionHead"><div><p className="eyebrow">Your details</p><h2>Member information</h2></div><button onClick={()=>edit(member)}><Edit3/> Edit profile</button></div><div className="profileInfoRows"><p><b>Name</b><span>{member.name}</span></p><p><b>Company</b><span>{member.company}</span></p><p><b>Position</b><span>{member.position||'Member'}</span></p><p><b>Category</b><span>{member.category}</span></p><p><b>Email</b><span>{member.email||'Not provided'}</span></p><p><b>Phone</b><span>{member.phone||'Hidden or not provided'}</span></p><p><b>Address</b><span>{member.address||'Not provided'}</span></p></div><h2>About</h2><p>{member.about||'Business profile introduction will appear here.'}</p><h2>Services</h2><div className="chips">{(member.services||member.category||'Member').split(',').map(x=><span key={x}>{x.trim()}</span>)}</div></div><div className="panel"><div className="sectionHead"><div><p className="eyebrow">History</p><h2>Your activity</h2></div><span className="historyCount">{history.length}</span></div><div className="historyList">{history.map(h=><div key={h.id} className="historyItem"><div><b>{h.title}</b><small>{h.type} • {h.date}</small></div><span className={h.status==='Approved'||h.status==='Completed'?'ok':'wait'}>{h.status}</span></div>)}</div></div></div><aside className="profileSide"><div className="vcard profileVcard"><div className="vfront"><Avatar m={member}/><h2>{member.name}</h2><p>{member.company}</p><small>{member.email||'Email not provided'}</small><small>{member.phone||'Phone hidden'}</small></div><div className="vback"><h3>Services</h3><p>{member.services||member.category}</p><button><Share2/> Share digital card</button><button><Download/> Download card</button></div></div>{changePassword&&<PasswordChangeBox currentAccount={currentAccount} changePassword={changePassword}/>}<div className="panel profileMiniPanel"><p className="eyebrow">Contacts</p><h2>Who you contacted</h2>{contacts.length?contacts.map(c=><div className="contactRow" key={c.id}><b>{c.name}</b><small>{c.company} • {c.date}</small></div>):<p className="mutedText">No contact history yet. Open a member from Directory to add them here.</p>}</div><div className="panel profileMiniPanel"><p className="eyebrow">Connections & posts</p><h2>Summary</h2><div className="profileStats"><div><b>{contacts.length}</b><span>Contacts</span></div><div><b>{Math.max(contacts.length-1,0)}</b><span>Connections</span></div><div><b>{ads.length}</b><span>Ads / posts</span></div></div></div></aside></section></>}


function Management({members=[],events=[],setPage,currentAccount}){
  const [accounts,setAccounts]=useState([]);
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState('');
  const [loginDraft,setLoginDraft]=useState({memberId:'',username:'',password:'123456',role:'member'});
  const [roleDraft,setRoleDraft]=useState({accountId:'',role:'level1_admin'});
  const role=currentAccount?.role || 'member';
  const canCreate=canCreateMemberLogin(role);
  const canAssign=canAssignAdminRoles(role);
  const canStatus=canViewAccountStatus(role);
  const existingAccountMemberIds=useMemo(()=>new Set(accounts.map(a=>a.member_id)),[accounts]);
  const membersWithoutAccounts=useMemo(()=>members.filter(m=>!existingAccountMemberIds.has(m.id)),[members,existingAccountMemberIds]);
  const level1=accounts.filter(a=>a.role==='level1_admin'||a.role==='admin');
  const level2=accounts.filter(a=>a.role==='level2_admin');
  const supers=accounts.filter(a=>a.role==='super_admin');
  const selectedRoleAccount=accounts.find(a=>a.account_id===roleDraft.accountId);
  useEffect(()=>{loadAccounts()},[currentAccount?.session_token]);
  useEffect(()=>{if(!loginDraft.memberId&&membersWithoutAccounts[0]){setLoginDraft(d=>({...d,memberId:membersWithoutAccounts[0].id}))}},[membersWithoutAccounts.length]);
  useEffect(()=>{if(!roleDraft.accountId&&accounts[0]){setRoleDraft(d=>({...d,accountId:accounts[0].account_id}))}},[accounts.length]);
  async function loadAccounts(){
    if(!currentAccount?.session_token||!supabaseConfigured||!supabase)return;
    try{
      const {data,error}=await supabase.rpc('ambi_admin_get_accounts',{p_session_token:currentAccount.session_token});
      if(error)throw error;
      setAccounts(data||[]);
    }catch(error){
      setMsg(error?.message||'Could not load admin accounts. Run the v20.4 SQL first.');
    }
  }
  async function createLogin(e){
    e.preventDefault();
    if(!canCreate){setMsg('Only Level 2 Admin or Super Admin can create logins.');return;}
    if(!loginDraft.memberId||!loginDraft.username.trim()||!loginDraft.password){setMsg('Choose member, username and temporary password.');return;}
    setBusy(true);setMsg('');
    try{
      const {error}=await supabase.rpc('ambi_admin_create_account',{p_session_token:currentAccount.session_token,p_member_id:loginDraft.memberId,p_username:loginDraft.username.trim(),p_temp_password:loginDraft.password,p_role:loginDraft.role});
      if(error)throw error;
      setMsg('Login account created with selected role. User must log in and change temporary password.');
      setLoginDraft({memberId:'',username:'',password:'123456',role:'member'});
      await loadAccounts();
    }catch(error){setMsg(error?.message||'Create login failed.')}finally{setBusy(false)}
  }
  async function updateRole(e){
    e.preventDefault();
    if(!canAssign){setMsg('Only Super Admin can assign admin roles.');return;}
    if(!roleDraft.accountId){setMsg('Choose an account first.');return;}
    setBusy(true);setMsg('');
    try{
      const {error}=await supabase.rpc('ambi_admin_set_role',{p_session_token:currentAccount.session_token,p_account_id:roleDraft.accountId,p_role:roleDraft.role});
      if(error)throw error;
      setMsg('Role updated. Ask the user to log out and log back in.');
      await loadAccounts();
    }catch(error){setMsg(error?.message||'Role update failed.')}finally{setBusy(false)}
  }
  async function resetPassword(account){
    const pass=prompt(`Temporary password for ${account.full_name || account.username}`,'123456');
    if(!pass)return;
    setBusy(true);setMsg('');
    try{
      const {error}=await supabase.rpc('ambi_admin_reset_password',{p_session_token:currentAccount.session_token,p_account_id:account.account_id,p_temp_password:pass});
      if(error)throw error;
      setMsg('Temporary password reset. User must change password on next login.');
      await loadAccounts();
    }catch(error){setMsg(error?.message||'Password reset failed.')}finally{setBusy(false)}
  }
  async function toggleActive(account){
    const next=!account.is_active;
    setBusy(true);setMsg('');
    try{
      const {error}=await supabase.rpc('ambi_admin_set_active',{p_session_token:currentAccount.session_token,p_account_id:account.account_id,p_is_active:next});
      if(error)throw error;
      setMsg(next?'Account unblocked.':'Account blocked.');
      await loadAccounts();
    }catch(error){setMsg(error?.message||'Account update failed.')}finally{setBusy(false)}
  }
  const roleOptions=[
    ['member','Member'],
    ['level1_admin','Level 1 Admin'],
    ['level2_admin','Level 2 Admin'],
    ['super_admin','Super Admin']
  ];
  return <>
    <section className="pageHero">
      <p className="eyebrow">Management</p>
      <h1>Admin settings</h1>
      <p>Simple admin setup: create a login for an approved directory member, then assign Level 1, Level 2 or Super Admin access one person at a time.</p>
    </section>
    <section className="stats">
      <div><b>{level1.length}</b><span>Level 1 admins</span></div>
      <div><b>{level2.length}</b><span>Level 2 admins</span></div>
      <div><b>{supers.length}</b><span>Super admin</span></div>
      <div><b>{accounts.length}</b><span>Login accounts</span></div>
    </section>
    {msg&&<div className="toast inlineToast"><CheckCircle2/>{msg}</div>}
    <section className="builder submitClean">
      <form onSubmit={createLogin}>
        <p className="eyebrow">Step 1</p>
        <h2>Create member login + role</h2>
        <p className="mutedText">Create a username, temporary password, and role in one step. Leave Role as Member for normal users.</p>
        <label>Member
          <select value={loginDraft.memberId} onChange={e=>setLoginDraft({...loginDraft,memberId:e.target.value})} disabled={!canCreate||busy}>
            <option value="">Select member without login</option>
            {membersWithoutAccounts.map(m=><option key={m.id} value={m.id}>{m.name} — {m.company}</option>)}
          </select>
        </label>
        <div className="two">
          <label>Username<input value={loginDraft.username} onChange={e=>setLoginDraft({...loginDraft,username:e.target.value})} placeholder="example: robin" disabled={!canCreate||busy}/></label>
          <label>Temporary password<input value={loginDraft.password} onChange={e=>setLoginDraft({...loginDraft,password:e.target.value})} placeholder="123456" disabled={!canCreate||busy}/></label>
        </div>
        <label>Role
          <select value={loginDraft.role} onChange={e=>setLoginDraft({...loginDraft,role:e.target.value})} disabled={!canCreate||busy}>
            {roleOptions.map(([value,label])=><option key={value} value={value} disabled={value!=='member'&&!canAssign}>{label}</option>)}
          </select>
        </label>
        {!canAssign&&<small>Level 2 admins can create normal Member logins only. Super Admin can create Level 1 / Level 2 / Super Admin logins.</small>}
        <button type="submit" disabled={!canCreate||busy}><Save/>Create login</button>
        {!canCreate&&<small>Level 2 Admin or Super Admin only.</small>}
      </form>
      <form onSubmit={updateRole}>
        <p className="eyebrow">Step 2</p>
        <h2>Update existing account role</h2>
        <p className="mutedText">For accounts already created, change the role here. Use Member to remove admin access.</p>
        <label>Account
          <select value={roleDraft.accountId} onChange={e=>setRoleDraft({...roleDraft,accountId:e.target.value})} disabled={!canAssign||busy}>
            <option value="">Select account</option>
            {accounts.map(a=><option key={a.account_id} value={a.account_id}>{a.full_name || a.username} — {a.username} — {roleLabel(a.role)}</option>)}
          </select>
        </label>
        <label>Role
          <select value={roleDraft.role} onChange={e=>setRoleDraft({...roleDraft,role:e.target.value})} disabled={!canAssign||busy}>{roleOptions.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select>
        </label>
        <button type="submit" disabled={!canAssign||busy}><ShieldCheck/>Update role</button>
        {selectedRoleAccount&&<small>Selected: {selectedRoleAccount.full_name || selectedRoleAccount.username} is currently {roleLabel(selectedRoleAccount.role)}.</small>}
        {!canAssign&&<small>Super Admin only.</small>}
      </form>
    </section>
    <section className="panel">
      <div className="sectionHead"><div><p className="eyebrow">Current admins</p><h2>Assigned admin team</h2></div><button onClick={loadAccounts}>Refresh</button></div>
      <div className="tableList">
        {[...supers,...level2,...level1].map(a=><div key={a.account_id}><Avatar m={{name:a.full_name||a.username,company:a.company_name||roleLabel(a.role),display:'initials'}}/><b>{a.full_name||a.username}</b><span>{roleLabel(a.role)} • {a.company_name||a.username}</span><small>{a.is_active?'Active':'Blocked'}</small></div>)}
        {![...supers,...level2,...level1].length&&<p className="mutedText">No admin accounts assigned yet.</p>}
      </div>
    </section>
    {canStatus&&<section className="panel">
      <div className="sectionHead"><div><p className="eyebrow">Account control</p><h2>Reset or block accounts</h2></div><span>{accounts.length} accounts</span></div>
      <div className="tableList">{accounts.map(a=><div key={a.account_id}><Avatar m={{name:a.full_name||a.username,company:a.company_name||'',display:'initials'}}/><b>{a.full_name||a.username}</b><span>{a.company_name||'No company'} • {roleLabel(a.role)} • {a.is_active?'Active':'Blocked'}</span><button onClick={()=>resetPassword(a)} disabled={busy}>Reset password</button><button onClick={()=>toggleActive(a)} disabled={busy}>{a.is_active?'Block':'Unblock'}</button></div>)}</div>
    </section>}
    <section className="panel">
      <div className="sectionHead"><div><p className="eyebrow">Calendar moderation</p><h2>Block or delete events</h2></div><button onClick={()=>setPage('calendar')}><CalendarDays/>Open Calendar</button></div>
      <div className="tableList">{events.filter(e=>!e.blocked).slice(0,10).map(ev=><div key={ev.id}><CalendarDays/><b>{ev.title}</b><span>{eventKeyDate(ev)} · {ev.time}</span><small>Use the Calendar page to block or delete this event.</small></div>)}</div>
    </section>
  </>
}

function CalendarPage({members,openProfile,events,setEvents,currentMember,currentAccount}){
  const todayMonth=5;
  const [view,setView]=useState('month');
  const [sound,setSound]=useState(true);
  const [showCreate,setShowCreate]=useState(false);
  const [selectedMonth,setSelectedMonth]=useState(todayMonth);
  const visibleEvents=useMemo(()=>events.filter(ev=>!ev.blocked),[events]);
  const monthEvents=useMemo(()=>visibleEvents.filter(ev=>dateParts(eventKeyDate(ev)).month===selectedMonth),[visibleEvents,selectedMonth]);
  const [selectedEventId,setSelectedEventId]=useState(monthEvents[0]?.id||visibleEvents[0]?.id||'');
  useEffect(()=>{if(!visibleEvents.some(ev=>ev.id===selectedEventId)){setSelectedEventId(monthEvents[0]?.id||visibleEvents[0]?.id||'')}},[visibleEvents.length,selectedMonth]);
  const selectedEvent=visibleEvents.find(ev=>ev.id===selectedEventId)||monthEvents[0]||visibleEvents[0];
  const [draft,setDraft]=useState({title:'',date:`2026-${String(selectedMonth+1).padStart(2,'0')}-24`,time:'4:00 PM',location:'BEG Office',type:'Member Event',createdBy:currentMember?.name||'Verified Member'});
  const firstDay=new Date(2026,selectedMonth,1).getDay();
  const daysInMonth=new Date(2026,selectedMonth+1,0).getDate();
  const cells=[...Array(firstDay).fill(null),...Array.from({length:daysInMonth},(_,i)=>i+1)];
  while(cells.length%7!==0)cells.push(null);
  const eventByDay=(day)=>monthEvents.filter(ev=>dateParts(eventKeyDate(ev)).day===day);
  const findMember=(name)=>members.find(m=>m.name===name);
  const attendeeNames=selectedEvent?[...(selectedEvent.attending||[]),...(selectedEvent.maybe||[]),...(selectedEvent.not||[])]:[];
  const attendeeMembers=attendeeNames.map(findMember).filter(Boolean);
  const companies=[...new Set(attendeeMembers.map(m=>m.company))];
  const total=selectedEvent?(selectedEvent.attending||[]).length+(selectedEvent.maybe||[]).length+(selectedEvent.not||[]).length:0;
  function triggerSound(){if(!sound)return;try{new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=').play().catch(()=>{})}catch{}}
  async function doRsvp(status){
    if(!selectedEvent)return;
    const name=currentMember?.name||'Verified Member';
    let updatedEvent=null;
    setEvents(list=>list.map(ev=>{
      if(ev.id!==selectedEvent.id)return ev;
      const clean={...ev,attending:(ev.attending||[]).filter(n=>n!==name),maybe:(ev.maybe||[]).filter(n=>n!==name),not:(ev.not||[]).filter(n=>n!==name)};
      const key=status==='attending'?'attending':status==='maybe'?'maybe':'not';
      updatedEvent={...clean,[key]:[...(clean[key]||[]),name]};
      return updatedEvent;
    }));
    if(supabaseConfigured&&supabase&&updatedEvent&&String(updatedEvent.id).length>20&&currentAccount?.session_token){
      const {data,error}=await supabase.rpc('ambi_rsvp_event',{p_session_token:currentAccount.session_token,p_event_id:updatedEvent.id,p_status:status});
      if(error&&import.meta.env.DEV)console.warn('RSVP saved locally but not in Supabase:',error.message);
      if(data){const fresh=Array.isArray(data)?data[0]:data;if(fresh?.id){const mapped=toAppEvent(fresh);setEvents(list=>list.map(ev=>ev.id===mapped.id?mapped:ev));}}
    }
    triggerSound();
  }
  async function saveEvent(){
    if(!draft.title.trim())return;
    const ev={id:'cal-'+Date.now(),title:draft.title.trim(),date:draft.date,time:draft.time||'All day',location:draft.location||'AMBI',type:draft.type||'Member Event',createdBy:currentMember?.name||draft.createdBy||'Verified Member',source:'Member-created calendar item',attending:[],maybe:[],not:[],blocked:false};
    let savedEvent=ev;
    if(supabaseConfigured&&supabase){
      try{
        if(!currentAccount?.session_token)throw new Error('Login session missing');
        const {data,error}=await supabase.rpc('ambi_create_event',{p_session_token:currentAccount.session_token,p_title:ev.title,p_event_date:ev.date,p_event_time:ev.time,p_location:ev.location,p_event_type:ev.type,p_description:ev.source});
        if(error)throw error;
        const row=Array.isArray(data)?data[0]:data;
        savedEvent=toAppEvent(row);
      }catch(error){
        if(import.meta.env.DEV)console.warn('Event saved locally but not in Supabase:',error?.message||error);
      }
    }
    setEvents(list=>[savedEvent,...list.filter(item=>item.id!==savedEvent.id)]);
    setSelectedMonth(dateParts(savedEvent.date).month);
    setSelectedEventId(savedEvent.id);
    setShowCreate(false);
    setDraft({title:'',date:savedEvent.date,time:'4:00 PM',location:'BEG Office',type:'Member Event',createdBy:currentMember?.name||'Verified Member'});
  }
  async function blockEvent(id){
    if(!canModerate(currentAccount?.role)){alert('Admin only');return;}
    setEvents(list=>list.map(ev=>ev.id===id?{...ev,blocked:true,blockedBy:currentAccount?.full_name||'Admin'}:ev));
    if(supabaseConfigured&&supabase&&String(id).length>20&&currentAccount?.session_token){
      const {error}=await supabase.rpc('ambi_block_event',{p_session_token:currentAccount.session_token,p_event_id:id});
      if(error&&import.meta.env.DEV)console.warn('Event blocked locally but not in Supabase:',error.message);
    }
  }
  async function deleteEvent(id){
    if(!canModerate(currentAccount?.role)){alert('Admin only');return;}
    setEvents(list=>list.filter(ev=>ev.id!==id));
    if(supabaseConfigured&&supabase&&String(id).length>20&&currentAccount?.session_token){
      const {error}=await supabase.rpc('ambi_delete_event',{p_session_token:currentAccount.session_token,p_event_id:id});
      if(error&&import.meta.env.DEV)console.warn('Event deleted locally but not in Supabase:',error.message);
    }
  }
  return <>
    <section className="pageHero reminderHero"><p className="eyebrow">Calendar</p><h1>Member calendar, holidays and RSVP.</h1><p>Approved members can create calendar items directly. They appear immediately for everyone. Admins can remove or block inappropriate items.</p><div className="heroActions"><button onClick={()=>setShowCreate(true)}><Plus/>Create Event</button><button onClick={()=>setSound(!sound)}><Bell/>{sound?'Sound On':'Sound Off'}</button></div></section>
    <section className="calendarAppV16">
      <aside className="calendarRailV16"><div className="miniYearV16"><button onClick={()=>setSelectedMonth(Math.max(0,selectedMonth-1))}>‹</button><b>2026</b><button onClick={()=>setSelectedMonth(Math.min(11,selectedMonth+1))}>›</button></div>{Array.from({length:12},(_,i)=><button key={i} className={i===selectedMonth?'active':''} onClick={()=>setSelectedMonth(i)}><span>{monthName(i)}</span><b>{visibleEvents.filter(ev=>dateParts(eventKeyDate(ev)).month===i).length}</b></button>)}</aside>
      <div className="calendarMainV16"><div className="calendarHeaderV16"><div><p className="eyebrow">{monthName(selectedMonth)} 2026</p><h2>AMBI Calendar</h2></div><div className="viewToggleV16"><button className={view==='month'?'active':''} onClick={()=>setView('month')}>Month</button><button className={view==='list'?'active':''} onClick={()=>setView('list')}>List</button></div></div>{view==='month'?<><div className="weekdaysV16">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=><b key={d}>{d}</b>)}</div><div className="monthGridV16">{cells.map((day,i)=>day?<button key={i} className={`${eventByDay(day).length?'hasEvent':''} ${selectedEvent&&dateParts(eventKeyDate(selectedEvent)).day===day&&dateParts(eventKeyDate(selectedEvent)).month===selectedMonth?'selected':''}`} onClick={()=>{const ev=eventByDay(day)[0]; if(ev)setSelectedEventId(ev.id)}}><span className="dayNumV16">{day}</span>{eventByDay(day).slice(0,3).map(ev=><small key={ev.id}>{ev.title}</small>)}</button>:<button key={i} className="blankDayV19" disabled></button>)}</div></>:<div className="eventListFullV16">{monthEvents.map(ev=><button key={ev.id} className={selectedEvent?.id===ev.id?'active':''} onClick={()=>setSelectedEventId(ev.id)}><b>{dateParts(eventKeyDate(ev)).day}</b><div><strong>{ev.title}</strong><small>{ev.time} · {ev.location}</small></div><span>{(ev.attending||[]).length} attending</span></button>)}</div>}</div>
      <aside className="eventDeskV16">{selectedEvent?<><div className="eventBadgeV16"><CalendarDays/><span>{selectedEvent.type||'Calendar Item'}</span></div><h2>{selectedEvent.title}</h2><p>{eventKeyDate(selectedEvent)} · {selectedEvent.time} · {selectedEvent.location}</p><small>Created by {selectedEvent.createdBy}. No approval required.</small><div className="rsvpStatsV16"><div><b>{(selectedEvent.attending||[]).length}</b><span>Attending</span></div><div><b>{(selectedEvent.maybe||[]).length}</b><span>Maybe</span></div><div><b>{(selectedEvent.not||[]).length}</b><span>Not</span></div></div><div className="rsvpButtonsV16"><button onClick={()=>doRsvp('attending')}>Attending</button><button onClick={()=>doRsvp('maybe')}>Maybe</button><button onClick={()=>doRsvp('not')}>Not Attending</button></div><div className="attendeeTabsV16"><h3>Attendee Directory</h3><AttendeeGroup title="Attending" names={selectedEvent.attending||[]} members={members} openProfile={openProfile}/><AttendeeGroup title="Maybe" names={selectedEvent.maybe||[]} members={members} openProfile={openProfile}/><AttendeeGroup title="Not Attending" names={selectedEvent.not||[]} members={members} openProfile={openProfile}/></div><div className="companiesV16"><h3>Attending Companies</h3>{companies.length?companies.map(c=><span key={c}>{c}</span>):<small>No company list yet.</small>}</div><div className="adminControlsV19"><h3>Admin controls</h3><button onClick={()=>blockEvent(selectedEvent.id)}><ShieldCheck/>Block event</button><button onClick={()=>deleteEvent(selectedEvent.id)}><Trash2/>Delete event</button></div></>:<p>No calendar item selected.</p>}</aside>
    </section>
    <section className="panel eventNetworkPanelV16"><div className="sectionHead"><div><p className="eyebrow">Event Network</p><h2>{total} member responses connected to verified profiles</h2></div><button><Share2/>Share Event</button></div><div className="eventMemberStripV16">{attendeeMembers.map(m=><button key={m.id} onClick={()=>openProfile(m)}><Avatar m={m}/><b>{m.name}</b><small>{m.company}</small></button>)}</div></section>
    {showCreate&&<div className="modalOverlayV16" onClick={()=>setShowCreate(false)}><div className="createEventModalV16" onClick={e=>e.stopPropagation()}><div className="sectionHead"><div><p className="eyebrow">Create Calendar Item</p><h2>Post directly to Calendar</h2></div><button onClick={()=>setShowCreate(false)}>Close</button></div><div className="two"><label>Event Title<input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} placeholder="Example: Business Networking Evening"/></label><label>Date<input type="date" value={draft.date} onChange={e=>setDraft({...draft,date:e.target.value})}/></label></div><div className="two"><label>Time<input value={draft.time} onChange={e=>setDraft({...draft,time:e.target.value})}/></label><label>Location<input value={draft.location} onChange={e=>setDraft({...draft,location:e.target.value})}/></label></div><label>Type<select value={draft.type} onChange={e=>setDraft({...draft,type:e.target.value})}><option>Member Event</option><option>Business Meeting</option><option>Announcement</option><option>Holiday / Observance</option></select></label><div className="successMsg"><CheckCircle2/> This will appear on the calendar immediately. Admin can block or delete later if required.</div><button onClick={saveEvent}><CheckCircle2/>Save to Calendar</button></div></div>}
  </>
}
function AttendeeGroup({title,names,members,openProfile}){return <div className="attendeeGroupV16"><div className="attendeeGroupHeadV16"><b>{title}</b><span>{names.length}</span></div>{names.length?names.map(name=>{const m=members.find(x=>x.name===name);return <button key={name} onClick={()=>m&&openProfile(m)}>{m?<Avatar m={m}/>:<div className="avatarMono mini">{name.slice(0,2).toUpperCase()}</div>}<div><strong>{name}</strong><small>{m?.company||'Verified Member'}</small></div><ChevronRight size={15}/></button>}):<small className="emptyMiniV16">No responses yet.</small>}</div>}

function SubmitContent({onCreatePost,currentMember}){
  const [asset,setAsset]=useState(null);const [kind,setKind]=useState('Advertisement');const [title,setTitle]=useState('');const [summary,setSummary]=useState('');const [details,setDetails]=useState('');const [msg,setMsg]=useState('');const [busy,setBusy]=useState(false);
  function fileUp(file){if(!file)return;readFile(file,v=>setAsset({name:file.name,type:file.type,src:v}))}
  async function submit(e){e.preventDefault();if(!title.trim()||!summary.trim()){setMsg('Please add a title and short summary before posting.');return}setBusy(true);setMsg('');try{await onCreatePost({kind,title:title.trim(),summary:summary.trim(),details:details.trim(),asset,createdBy:currentMember?.name||'Member',company:currentMember?.company||''});setTitle('');setSummary('');setDetails('');setAsset(null);setKind('Advertisement');setMsg('Posted to Home notice board. Admin can block/delete later if required.')}catch(error){setMsg(error?.message||'Post failed. Please try again.')}finally{setBusy(false)}}
  return <><section className="pageHero"><p className="eyebrow">Member post</p><h1>Post a notice, advertisement or announcement.</h1><p>No approval queue. Member posts appear on the Home notice board immediately. Admins can block or delete unsuitable posts later.</p></section><section className="builder submitClean"><form onSubmit={submit}><label>Post type<select value={kind} onChange={e=>setKind(e.target.value)}><option>Advertisement</option><option>Notice</option><option>Announcement</option><option>Event Notice</option><option>Business Offer</option></select></label><label>Title<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Example: Special member offer / meeting notice"/></label><label>Short summary<textarea value={summary} onChange={e=>setSummary(e.target.value)} placeholder="This short summary appears on the Home notice board."/></label><label className="submitUpload"><Upload/> Upload image or PDF<input type="file" accept="image/*,.pdf" onChange={e=>fileUp(e.target.files[0])}/>{asset&&<span>{asset.name}</span>}</label><label>Full details<textarea value={details} onChange={e=>setDetails(e.target.value)} placeholder="Add date, location, contact number, offer details or supporting information."/></label><button type="submit" disabled={busy}><Save/> {busy?'Posting...':'Post to Home'}</button>{msg&&<div className="successMsg">{msg}</div>}</form><aside className="preview"><h2>Home card preview</h2><div className="contentPreviewCard"><span>{kind}</span><h3>{title||'Post title'}</h3><p>{summary||'Short summary will appear here.'}</p>{asset&&asset.type.startsWith('image/')?<img src={asset.src}/>:asset&&<b>PDF attached: {asset.name}</b>}<small>Posted by {currentMember?.name||'Verified Member'}{currentMember?.company?` • ${currentMember.company}`:''}</small></div></aside></section></>}
function Notifications({events=[],setPage}){const upcoming=events.filter(e=>!e.blocked).slice(0,6);return <><section className="pageHero"><p className="eyebrow">Notifications</p><h1>Member alerts and calendar reminders</h1><p>Latest AMBI alerts, calendar items and member notices. Use Calendar for RSVP and full event details.</p></section><section className="panel"><div className="sectionHead"><h2>Important alerts</h2><button onClick={()=>setPage('calendar')}><CalendarDays/>Open Calendar</button></div>{notificationSeed.map(n=><div className="notice" key={n.t}><Bell/><div><h3>{n.t}</h3><p>{n.d}</p></div></div>)}{upcoming.map(ev=><div className="notice" key={ev.id}><CalendarDays/><div><h3>{ev.title}</h3><p>{eventKeyDate(ev)} · {ev.time} · {ev.location}</p></div></div>)}</section></>}
createRoot(document.getElementById('root')).render(<App/>);
