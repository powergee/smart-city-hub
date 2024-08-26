import { Locale } from "core/model";

type SolutionCategoryData = {
  name: string;
  nameEng: string;
  desc: string[];
  descEng: string[];
  subCategories: { name: string; nameEng: string; buttonPosition: [number, number] }[];
}[];

export type SolutionCategory = {
  name: string;
  desc: string[];
  subCategories: { name: string; buttonPosition: [number, number] }[];
};

const categories: SolutionCategoryData = [
  {
    name: "건설",
    nameEng: "Construction",
    desc: [
      "건설 기술은 단순히 건물을 설계하는 것을 넘어 건물을 설계하는 단계부터 사람이 생활하기까지, 사람의 안전과 안락함을 책임지는 기술입니다.",
      "최근에는 스마트 빌딩 관리 시스템, 스마트 설계, 스마트 홈, 시설물 관리의 지능화 기술 등 GIS와 IT가 융합된 형태로 건설 기술이 발전하고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      { name: "스마트 건설", nameEng: "Smart Construction", buttonPosition: [8.7, 34.6] },
      { name: "스마트 빌딩", nameEng: "Smart Building", buttonPosition: [25.2, 12] },
      {
        name: "도시 계획 컨설팅",
        nameEng: "Urban Planning Consulting",
        buttonPosition: [62.2, 34.6],
      },
      { name: "스마트 홈", nameEng: "Smart Home", buttonPosition: [54.8, 69] },
    ],
  },
  {
    name: "고용노동",
    nameEng: "Labor employment",
    desc: [
      "고용노동 기술은 IT 기술을 활용한 근무 시스템, 인사관리 시스템 등을 제공함으로써 고객사의 채용 및 직원 관리의 부담을 덜어주는 기술입니다.",
      "최근에는 실시간 협업 및 이동근무를 위한 통신기술/가상공간상의 근로 환경 제공을 위한 u-Work 기술과 인사관리 시스템 등이 등장하고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "근무 환경 관리",
        nameEng: "Work Environment Management",
        buttonPosition: [21.8, 25.6],
      },
      {
        name: "스마트 인재 관리",
        nameEng: "Smart Talent Management",
        buttonPosition: [61.4, 11.3],
      },
    ],
  },
  {
    name: "공장",
    nameEng: "Factory",
    desc: [
      "공장을 운영하고 제조 공정을 효율적으로 개선하는 한편 작업자의 안전을 책임지는 기술입니다.",
      "제조공정의 디지털화를 통한 원격 생산 및 운송/실시간 설비 오류 감지시스템 등이 등장하고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "작업장 관리 시스템",
        nameEng: "Workplace Management System",
        buttonPosition: [43, 7.1],
      },
      {
        name: "생산·운영 관리 시스템",
        nameEng: "Production and Operation Management System",
        buttonPosition: [7.4, 32.5],
      },
      {
        name: "설비 관리 시스템",
        nameEng: "Facility Management System",
        buttonPosition: [54.5, 53.5],
      },
    ],
  },
  {
    name: "관광",
    nameEng: "Tourism",
    desc: [
      "IT 기술과 로봇 기술을 이용해 관광 정보를 제공하거나 스마트 관광 단지를 구축하는 기술입니다.",
      "문화·관광 서비스를 위한 유무선 통합 전자화폐, 기술/도시 문화자산의 DB 구축 및 공유 기술, 그리고 지역별 특화 One-Stop 문화 관광 스포츠 서비스 제공 기술 등 넓은 범위에서 다양한 기술들이 제안되고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      { name: "관광 정보", nameEng: "Tourism Information", buttonPosition: [5.17, 14.1] },
      { name: "스마트 안내", nameEng: "Smart Guide", buttonPosition: [69.1, 26.3] },
      {
        name: "스마트 관광 단지",
        nameEng: "Smart Tourism Complex",
        buttonPosition: [34.7, 6.6],
      },
    ],
  },
  {
    name: "교육",
    nameEng: "Education",
    desc: [
      "교육 콘텐츠를 개발하고 학급 네트워크를 구축하여 학습의 효율성을 높이는 기술입니다.",
      "비대면 수업을 위한 전자출결 시스템, u-Class, u-Library, u-스마트카드 학생증 등 오프라인의 벽을 넘으려는 도약이 계속되고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      { name: "교육 콘텐츠", nameEng: "Educational Content", buttonPosition: [48.7, 25.8] },
      {
        name: "교내 시설 스마트화",
        nameEng: "Smart School Facilities",
        buttonPosition: [79.9, 12.9],
      },
      { name: "어린이 교육", nameEng: "Children's Education", buttonPosition: [32.1, 29.45] },
      { name: "스마트 학습 보조", nameEng: "Smart Learning Aid", buttonPosition: [2.15, 16.93] },
    ],
  },
  {
    name: "교통",
    nameEng: "Traffic",
    desc: [
      "도로 위 보행자와 차량의 안전을 확보하면서 교통망의 부담을 획기적으로 개선하고 자율주행자동차와 공유 자전거의 기초를 담당하는 기술입니다.",
      "지능형 교통 시스템(ITS), 실시간 종합교통정보 제공, 대중 교통망 확충 시스템, 교통요금 전자 지불 처리 등 IT 기술로 기존의 불편함을 해소하거나 완전히 새로운 교통 시스템이 등장하고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "무인 단속 플랫폼",
        nameEng: "Unmanned Enforcement Platform",
        buttonPosition: [5.46, 21.81],
      },
      {
        name: "스마트 파킹 서비스",
        nameEng: "Smart Parking Service",
        buttonPosition: [48.79, 64.04],
      },
      {
        name: "스마트 횡단보도",
        nameEng: "Smart Crosswalk",
        buttonPosition: [63.6, 51.76],
      },
      {
        name: "도시 공유자동차 서비스",
        nameEng: "Urban Car Sharing Service",
        buttonPosition: [3.85, 85.21],
      },
      {
        name: "교통정보 제공 및 관리",
        nameEng: "Traffic Information Provision and Management",
        buttonPosition: [19.13, 8.86],
      },
      {
        name: "운전 경고 알림 서비스",
        nameEng: "Driving Warning Notification Service",
        buttonPosition: [42.68, 37.37],
      },
      {
        name: "교통안전 관리 시스템",
        nameEng: "Traffic Safety Management System",
        buttonPosition: [75.8, 35.68],
      },
      {
        name: "자율주행 교통 시스템",
        nameEng: "Autonomous Driving Traffic System",
        buttonPosition: [25.77, 20.77],
      },
      {
        name: "도시 공유자전거 서비스",
        nameEng: "Urban Bike Sharing Service",
        buttonPosition: [80.97, 19.73],
      },
      {
        name: "스마트 자동차 제어 시스템",
        nameEng: "Smart Car Control System",
        buttonPosition: [23.85, 29512],
      },
      {
        name: "스마트 항공 시스템",
        nameEng: "Smart Aviation System",
        buttonPosition: [63.75, 8.75],
      },
      {
        name: "스마트 대중교통 서비스",
        nameEng: "Smart Public Transportation Service",
        buttonPosition: [28.08, 60.63],
      },
      {
        name: "교통요금 전자결제 서비스",
        nameEng: "Traffic Fare Electronic Payment Service",
        buttonPosition: [40.05, 48.74],
      },
      {
        name: "스마트 항로표지 서비스",
        nameEng: "Smart Route Sign Service",
        buttonPosition: [47.93, 19.08],
      },
    ],
  },
  {
    name: "그린·에너지",
    nameEng: "Green·Energy",
    desc: [
      "신재생 에너지를 생산하고 관리하거나 에너지 사용 효율을 개선하는 여러 기법들이 제안되고 있습니다.",
      "지능형 전력망(스마트그리드) 확산사업 및 관리, 실시간 환경 감시 및 관리를 위한 환경 모니터링, 에너지 절약형 에코시티 구축 및 관리시스템 등 지속 가능한 발전을 위한 여러 시도가 이루어지고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "대기질 모니터링 서비스",
        nameEng: "Air Quality Monitoring Service",
        buttonPosition: [9.87, 3.64],
      },
      {
        name: "에너지 절감 및 활용",
        nameEng: "Energy Saving and Utilization",
        buttonPosition: [70.55, 57.1],
      },
      {
        name: "신재생 에너지 생산 및 관리시설",
        nameEng: "Renewable Energy Production and Management Facility",
        buttonPosition: [43.13, 12.93],
      },
      {
        name: "도시·시설물·운영 관리",
        nameEng: "Urban·Facility·Operation Management",
        buttonPosition: [81.58, 35.68],
      },
      {
        name: "전기요금 관리 서비스",
        nameEng: "Electricity Bill Management Service",
        buttonPosition: [6.63, 46.8],
      },
      {
        name: "전력 생산 및 공급",
        nameEng: "Power Production and Supply",
        buttonPosition: [28.55, 31.61],
      },
      {
        name: "전력 판매 및 통신",
        nameEng: "Power Sales and Communication",
        buttonPosition: [20.83, 55.15],
      },
    ],
  },
  {
    name: "금융",
    nameEng: "Finance",
    desc: [
      "모바일 뱅킹부터 금융 Software의 보안에 이르기까지, 온라인 금융 시스템의 뼈대를 구성하는 기술입니다.",
      "전자결제 및 인터넷 뱅킹 서비스, 온라인 자산 관리시스템 등 많은 사람들이 일상속에서 사용하는 금융 기술을 개발합니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "금융데이터 구축/서비스",
        nameEng: "Financial Data Construction/Service",
        buttonPosition: [4.38, 19.19],
      },
      {
        name: "전자결제시스템",
        nameEng: "Electronic Payment System",
        buttonPosition: [79.26, 14.36],
      },
      {
        name: "금융SW IT 서비스",
        nameEng: "Finance SW/ IT Service",
        buttonPosition: [79.18, 64.43],
      },
      { name: "모바일 뱅킹", nameEng: "Mobile Banking", buttonPosition: [3.15, 62.06] },
    ],
  },
  {
    name: "농업",
    nameEng: "Agriculture",
    desc: [
      "로봇과 IT 기술을 이용하여 농산물의 생산 효율을 높이고 농축산업 정보를 제공하는 기술입니다.",
      "IoT를 활용한 u-Farm 서비스, u-축사서비스 등 IoT와 통신 기술을 융합한 시도가 이루어지고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "농축산업 정보 제공 시스템",
        nameEng: "Agriculture and Livestock Information System",
        buttonPosition: [79.65, 48.49],
      },
      { name: "스마트 농장", nameEng: "Smart Farm", buttonPosition: [38.96, 8.1] },
    ],
  },
  {
    name: "문화예술",
    nameEng: "Culture and Art",
    desc: [
      "스마트 콘텐츠를 제공하는 것부터, 인공지능으로 새로운 예술 작품을 창작하기까지, 스마트 기술을 이용하여 문화 예술 향유를 돕는 기술입니다.",
      "온라인 문화공간(도서관, 박물관, 미술관, 전시관 등) 관리 기술, 모바일 문화관광 안내, 콘텐츠(VR) 서비스, 지능형 스포츠 경기장 구축 기술 및 가상현실 스포츠 시뮬레이션기술 등 온라인으로 문화 예술을 향유할 수 있게 해주는 기술을 개발합니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "영상 전송 시스템",
        nameEng: "Video Transmission System",
        buttonPosition: [25.38, 4.17],
      },
      {
        name: "스마트 콘텐츠 서비스",
        nameEng: "Smart Content Service",
        buttonPosition: [3.85, 60.62],
      },
      { name: "인공지능 창작", nameEng: "AI Creation", buttonPosition: [56.85, 51.62] },
      { name: "게임", nameEng: "Game", buttonPosition: [37.81, 32.26] },
      { name: "공연장 운영", nameEng: "Performance Hall Operation", buttonPosition: [73.86, 37.9] },
    ],
  },
  {
    name: "물관리",
    nameEng: "Water management",
    desc: [
      "수자원의 정화하고 전력원으로 이용하기 위한 여러 기술이 포함됩니다.",
      "도시 수자원 오염물질 유출저감 및 통합관리체계 구축, IoT 기반 상수도 시설, 하수도 시설 관리시스템 및 하천시설물 관리 등 상수도를 관리하고 깨끗한 수자원을 만듭니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "스마트 워터 시티 사업",
        nameEng: "Smart Water City Project",
        buttonPosition: [7.55, 36.86],
      },
      {
        name: "실시간 누수 관측 및 제어 시스템",
        nameEng: "Real-time Leakage Observation and Control System",
        buttonPosition: [59.43, 7.31],
      },
      { name: "물 여과 시스템", nameEng: "Water Filtration System", buttonPosition: [22.91, 9.39] },
      {
        name: "자가진단형 하수처리장 기술",
        nameEng: "Self-diagnostic Sewage Treatment Plant Technology",
        buttonPosition: [75.71, 50.18],
      },
      {
        name: "스마트 미터링 서비스",
        nameEng: "Smart Metering Service",
        buttonPosition: [40.81, 65.98],
      },
      {
        name: "지능형 정수장 관리시스템",
        nameEng: "Intelligent Water Purification Plant Management System",
        buttonPosition: [54.33, 76.71],
      },
    ],
  },
  {
    name: "물류",
    nameEng: "Logistics",
    desc: [
      "물류 시스템을 자동화하고 선박 시스템을 효율적으로 운영하는 기술입니다.",
      "LBS 기반의 실시간 차량 추적 및 원격 차량 관리, 폭발성화물/방사성화물/폐기물 등 위험화물 운송 보관상의 안전관리, RFID/USN 기반의 지능형 선진형 통합물류 관리 시스템을 제공합니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "자동 물류 시스템",
        nameEng: "Automatic Logistics System",
        buttonPosition: [70.08, 12.41],
      },
      {
        name: "선박 운영 시스템",
        nameEng: "Ship Operation System",
        buttonPosition: [39.2, 12.61],
      },
      {
        name: "물류 관리 시스템",
        nameEng: "Logistics Management System",
        buttonPosition: [10.46, 30.53],
      },
    ],
  },
  {
    name: "방범",
    nameEng: "Crime prevention",
    desc: [
      "범죄를 예방하고 이를 추적하기 위한 스마트 기술입니다.",
      "방범을 위한 센서 및 CCTV 기반의 위치 추적 관리, 빅데이터 분석기반 지능형 CCTV 설치 및 영상감시 등 범죄를 예방하기 위한 여러 기술이 제안되고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "실시간 위치 기반 서비스",
        nameEng: "Real-time Location-based Service",
        buttonPosition: [4.3, 5.8],
      },
      { name: "국방 시스템", nameEng: "Defense System", buttonPosition: [4.3, 37.9] },
      {
        name: "공공공간 안전관리",
        nameEng: "Public Space Safety Management",
        buttonPosition: [4.3, 66.6],
      },
      { name: "보안 시스템", nameEng: "Security System", buttonPosition: [77.3, 5.8] },
      {
        name: "실시간 범죄 모니터링 시스템",
        nameEng: "Real-time Crime Monitoring System",
        buttonPosition: [77.3, 37.9],
      },
      {
        name: "지하공간 모니터링",
        nameEng: "Underground Space Monitoring",
        buttonPosition: [77.3, 66.6],
      },
    ],
  },
  {
    name: "방재",
    nameEng: "Disaster prevention",
    desc: [
      "갑작스럽게 발생하는 재해로부터 시민을 보호하고 이에 대비하기 위한 빅데이터를 구축하는 기술입니다.",
      "효율적인 재해대비를 위한 국가자산의 3D 공간정보 구축, 재해 유형별 지능형 예방대응 기술, 교량, 터널, 문화재 등 실시간 모니터링 및 재해감지 기술 등 일상속 재해 대비를 책임지고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "사고현장 실시간 대응서비스",
        nameEng: "Real-time Accident Response Service",
        buttonPosition: [17.38, 45.52],
      },
      {
        name: "공공시설물 안전관리 서비스",
        nameEng: "Public Facility Safety Management Service",
        buttonPosition: [46.96, 5.84],
      },
      {
        name: "자연재해 및 재난관리시스템",
        nameEng: "Natural Disaster and Disaster Management System",
        buttonPosition: [73.21, 42.59],
      },
    ],
  },
  {
    name: "복지",
    nameEng: "Welfare",
    desc: [
      "소외계층부터 일반 시민에 이르기까지, 시민들의 건강과 안전을 담당하는 기술입니다.",
      "독거노인, 장애인 대상 원격 건강상태 감지, 맞춤형 첨단 보건의료 복지서비스 제공 기술 등을 제공합니다.",
    ],
    descEng: [],
    subCategories: [
      { name: "실버 케어 서비스", nameEng: "Silver Care Service", buttonPosition: [42, 8.36] },
    ],
  },
  {
    name: "비지니스",
    nameEng: "Business",
    desc: [
      "기업을 운영하고 보다 효율적인 마케팅을 하기 위한 기술입니다.",
      "비콘 기반 소상공인 마케팅과 비콘 기반 저비용 고효율 마케팅 등 새로운 마케팅 기법이 제안되고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "기업 운영 및 정보 관리",
        nameEng: "Enterprise Operation and Information Management",
        buttonPosition: [14.8, 32.9],
      },
      {
        name: "스마트 마케팅 솔루션",
        nameEng: "Smart Marketing Solution",
        buttonPosition: [25, 49.3],
      },
      {
        name: "비즈니스 협력 지원",
        nameEng: "Business Cooperation Support",
        buttonPosition: [47.7, 16.9],
      },
      { name: "고객센터 운영", nameEng: "Customer Center Operation", buttonPosition: [77.6, 25.6] },
      {
        name: "기업용 ICT 서비스",
        nameEng: "Enterprise ICT Service",
        buttonPosition: [66.3, 49.5],
      },
      { name: "점포 무인화", nameEng: "Store Automation", buttonPosition: [76.0, 62.7] },
      { name: "전자상거래", nameEng: "E-commerce", buttonPosition: [50.2, 80.8] },
    ],
  },
  {
    name: "시민참여",
    nameEng: "Citizen participation",
    desc: [
      "시민으로서 지역 사회에 참여하기 위한 새로운 방법을 제시합니다.",
      "온/오프채널 통합을 통한 소통 창구 단순화, 우리 도시 문제 현황 파악 토크콘서트 채널 도입, 도시 문제해결 및 신규 도입 스마트 서비스에 대한 시민 공모전 실행 등 시민으로서 우리 도시에 대한 논의에 참여할 수 있는 창구를 만들고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "지역주민 참여 애플리케이션",
        nameEng: "Local Resident Participation Application",
        buttonPosition: [12.36, 16.11],
      },
      {
        name: "시민 참여 시스템",
        nameEng: "Citizen Participation System",
        buttonPosition: [42.21, 61.64],
      },
    ],
  },
  {
    name: "쓰레기처리",
    nameEng: "Waste disposal",
    desc: [
      "폐기물을 수거하기 위한 경로를 최적화하고, 쓰레기를 처리하기 위한 새로운 기술입니다.",
      "실시간 쓰레기량 측정시스템, 효율적인 쓰레기 수거 경로 수립 등 효과적인 쓰레기처리 시스템이 고안되고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "쓰레기 수거 경로 최적화",
        nameEng: "Garbage Collection Route Optimization",
        buttonPosition: [21.15, 47.16],
      },
      { name: "스마트 쓰레기통", nameEng: "Smart Garbage Can", buttonPosition: [8.3, 3.83] },
      {
        name: "재활용 보상 서비스",
        nameEng: "Recycling Reward Service",
        buttonPosition: [50.85, 2.0],
      },
      {
        name: "대형 폐기물 처리 서비스",
        nameEng: "Large Waste Disposal Service",
        buttonPosition: [78.83, 51.93],
      },
      {
        name: "쓰레기 요금 자동 정산 시스템",
        nameEng: "Garbage Fee Automatic Settlement System",
        buttonPosition: [80.85, 3.27],
      },
    ],
  },
  {
    name: "의료·보건",
    nameEng: "Medical·Health",
    desc: [
      "스마트 도시 기술을 이용해 미래형 의료 산업을 구축하는 기술입니다.",
      "원격의료서비스, 보건관리서비스, 보건소 서비스, 가족안심서비스, 장애인지원서비스, 다문화가정 지원서비스, 출산 및 보육지원서비스, 전자건강기록(EHR) 및 기관 간 정보공유를 통한 공공 의료서비스 제공 기술 등이 등장하고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "검진 및 재활 기기",
        nameEng: "Examination and Rehabilitation Equipment",
        buttonPosition: [11.33, 56.3],
      },
      { name: "스마트 헬스케어", nameEng: "Smart Healthcare", buttonPosition: [61.43, 57.94] },
      { name: "원격의료 시스템", nameEng: "Remote Medical System", buttonPosition: [80.11, 11.51] },
      {
        name: "디지털 의료정보 관리",
        nameEng: "Digital Medical Information Management",
        buttonPosition: [0.533, 3.1],
      },
      {
        name: "전염성 질병 감시 시스템",
        nameEng: "Infectious Disease Monitoring System",
        buttonPosition: [44.16, 5.27],
      },
      {
        name: "미래형 의료 산업",
        nameEng: "Future Medical Industry",
        buttonPosition: [39.3, 29.6],
      },
      {
        name: "공공시설 보건 관리",
        nameEng: "Public Facility Health Management",
        buttonPosition: [35.3, 66.18],
      },
      {
        name: "병원 운영 시스템",
        nameEng: "Hospital Operation System",
        buttonPosition: [21.05, 6.57],
      },
    ],
  },
  {
    name: "전자정부",
    nameEng: "E-Government",
    desc: [
      "행정 처리를 위한 디지털 행정시스템과 디지털 문서화 및 투표 기술 등을 포함하고 있습니다.",
      "모바일 행정지원 기술, 스마트 신분증 도입 관리 및 이용 기술, 공공시설물 관리 등 통합 관제시스템 등 수준 높은 행정 처리 기술이 등장하고 있습니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "도시 관제 시스템",
        nameEng: "City Control System",
        buttonPosition: [9.2, 37.79],
      },
      {
        name: "디지털 행정시스템 구축",
        nameEng: "Digital Administrative System Construction",
        buttonPosition: [40.95, 27.94],
      },
      {
        name: "디지털 정보 보안",
        nameEng: "Digital Information Security",
        buttonPosition: [9.2, 6.97],
      },
      {
        name: "디지털 문서화 및 투표",
        nameEng: "Digital Documentation and Voting",
        buttonPosition: [77.13, 6.97],
      },
      { name: "데이터 분석", nameEng: "Data Analysis", buttonPosition: [9.2, 68.21] },
      {
        name: "국공유지 및 공간정보 관리시스템",
        nameEng: "National Land and Spatial Information Management System",
        buttonPosition: [77.13, 68.21],
      },
      {
        name: "지적재 조사 서비스",
        nameEng: "Cadastral Survey Service",
        buttonPosition: [77.13, 37.79],
      },
    ],
  },
  {
    name: "통신기술",
    nameEng: "Communication technology",
    desc: [
      "텍스트, 영상 등의 데이터를 효율적으로 전송하고 상호작용하는 기술입니다.",
      "정보통신망의 효율적 구축, 정보통신망 연계 기술 등 통신의 복잡성을 줄이고 효율을 높이는 시스템을 구축합니다.",
    ],
    descEng: [],
    subCategories: [
      {
        name: "스마트 통신 연결",
        nameEng: "Smart Communication Connection",
        buttonPosition: [70.05, 6.6],
      },
      {
        name: "ICT 기술 및 모듈",
        nameEng: "ICT Technology and Module",
        buttonPosition: [70.05, 35.47],
      },
      { name: "데이터 이미지화", nameEng: "Data Imaging", buttonPosition: [70.05, 64.35] },
    ],
  },
];

export function getSolutionCategory(id: number, lang: Locale): SolutionCategory {
  return {
    name: lang === "ko" ? categories[id].name : categories[id].nameEng,
    desc: lang === "ko" ? categories[id].desc : categories[id].descEng,
    subCategories: categories[id].subCategories.map((sub) => ({
      name: lang === "ko" ? sub.name : sub.nameEng,
      buttonPosition: sub.buttonPosition,
    })),
  };
}

export function getSolutionCategoryAll(lang: Locale): SolutionCategory[] {
  return categories.map((category) => getSolutionCategory(categories.indexOf(category), lang));
}
