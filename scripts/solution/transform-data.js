const fs = require('fs');
const path = require('path');

// Paths
const COMPANY_FILE = path.join(__dirname, 'solution_company_db_20240826.json');
const SOLUTION_FILE = path.join(__dirname, 'solution_db_20240704.json');
const COMPANY_OUT = path.join(__dirname, 'solution_company_db_v2.json');
const SOLUTION_OUT = path.join(__dirname, 'solution_db_v2.json');

// Helper to fallback to empty string
function val(v) {
  return v || "";
}

function generateShortId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getSuperCategoryId(mainCatId) {
    if (mainCatId >= 0 && mainCatId <= 5) return 0;
    if (mainCatId >= 6 && mainCatId <= 12) return 1;
    if (mainCatId >= 13 && mainCatId <= 16) return 2;
    if (mainCatId >= 17 && mainCatId <= 20) return 3;
    return 0; // Default or error
}

// ... read files ...
const companyData = JSON.parse(fs.readFileSync(COMPANY_FILE, 'utf-8'));
const solutionData = JSON.parse(fs.readFileSync(SOLUTION_FILE, 'utf-8'));

const companies = [];
const solutions = [];

// Map to store new IDs
const companyIdMap = {}; // old_id -> new_short_id

// Transform Companies
companyData.forEach(c => {
  const newId = generateShortId();
  companyIdMap[c.id] = newId;

  companies.push({
    companyId: newId,
    ko: {
      name: val(c.company_name),
      ceo: val(c.ceo_name),
      address: val(c.address),
      tel: val(c.tel_num),
      fax: val(c.fax_num),
      website: val(c.homepage_url),
    },
    en: {
      name: val(c.company_name_eng),
      ceo: val(c.ceo_name_eng),
      address: val(c.address_eng),
      tel: val(c.tel_num),
      fax: val(c.fax_num),
      website: val(c.homepage_url),
    }
  });
});

// Transform Solutions
solutionData.forEach(s => {
  const newCompanyId = companyIdMap[s.company_id];
  if (!newCompanyId) {
    console.warn(`Skipping solution ${s.solution_name}: Company ID ${s.company_id} not found.`);
    return;
  }
  
  const mainId = parseInt(s.cate_main_id) || 0;

  solutions.push({
    solutionId: generateShortId(),
    companyId: newCompanyId,
    superCategoryId: getSuperCategoryId(mainId),
    mainCategoryId: mainId,
    subCategoryId: parseInt(s.cate_sub_id) || 0,
    ko: {
      title: val(s.solution_name),
      summary: val(s.solution_summary),
      abstract: val(s.solution_abstract),
      feature: val(s.solution_feature),
      composition: val(s.solution_composition),
    },
    en: {
      title: val(s.solution_name_eng),
      summary: val(s.solution_summary_eng),
      abstract: val(s.solution_abstract_eng),
      feature: val(s.solution_feature_eng),
      composition: val(s.solution_composition_eng),
    }
  });
});

// Write Output
fs.writeFileSync(COMPANY_OUT, JSON.stringify(companies, null, 2));
fs.writeFileSync(SOLUTION_OUT, JSON.stringify(solutions, null, 2));

console.log(`Transformed ${companies.length} companies and ${solutions.length} solutions.`);
