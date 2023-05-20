const categories = [
  {
    name: "건설",
    sub: [
      { name: "스마트 건설", tag: "smartConstruction" },
      { name: "스마트 빌딩", tag: "smartBuilding" },
      { name: "도시계획 컨설팅", tag: "urbanPlanningConsulting" },
      { name: "스마트 홈", tag: "smartHome" },
    ],
  },
  {
    name: "고용노동",
    sub: [
      { name: "근무환경 관리", tag: "workingEnvironmentManagement" },
      { name: "스마트 인재관리", tag: "smartHumanManagement" },
    ],
  },
  {
    name: "공장",
    sub: [
      { name: "작업장 관리 시스템", tag: "workplaceManagementSystem" },
      {
        name: "생산 및 운영 관리시스템",
        tag: "productionOperationManagementSystem",
      },
      { name: "설비 관리시스템", tag: "equipmentManagementSystem" },
    ],
  },
  {
    name: "관광",
    sub: [
      { name: "관광 정보", tag: "touristInfo" },
      { name: "스마트 안내", tag: "smartGuide" },
      { name: "스마트 관광 단지", tag: "smartTouristZone" },
    ],
  },
  {
    name: "교육",
    sub: [
      { name: "교육 콘텐츠", tag: "educationalContent" },
      { name: "교내 시설 스마트화", tag: "smartSchoolFacilities" },
      { name: "어린이 교육", tag: "childrenEducation" },
      { name: "스마트 학습 보조", tag: "smartLearningSupport" },
    ],
  },
  {
    name: "교통",
    sub: [
      { name: "무인 단속 플랫폼", tag: "unmannedControlPlatform" },
      { name: "스마트 파킹 서비스", tag: "smartParkingService" },
      { name: "스마트 횡단보도", tag: "smartCrosswalk" },
      { name: "도시 공유자동차 서비스", tag: "citySharedCarService" },
      { name: "교통정보 제공 및 관리", tag: "trafficInfoProvideManage" },
      { name: "운전 경고 알림 서비스", tag: "drivingWarningAlertService" },
      { name: "교통 안전 관리 시스템", tag: "trafficSafetyManagementSystem" },
      { name: "자율주행 교통 시스템", tag: "autonomousTrafficSystem" },
      { name: "도시 공유자전거 서비스", tag: "citySharedBicycleService" },
      { name: "스마트 자동차 제어시스템", tag: "smartCarControlSystem" },
      { name: "스마트 항공 시스템", tag: "smartAviationSystem" },
      { name: "스마트 대중교통 서비스", tag: "smartPublicTransportService" },
      {
        name: "교통요금 전자결제 서비스",
        tag: "trafficFeeElectronicPaymentService",
      },
      { name: "스마트 항로표지 서비스", tag: "smartNavigationSignsService" },
    ],
  },
  {
    name: "그린·에너지",
    sub: [
      { name: "대기질 모니터링 서비스", tag: "airQualityMonitoringService" },
      { name: "에너지 절감 및 활용", tag: "energySavingUtilization" },
      {
        name: "신재생 에너지 생산 및 관리시설",
        tag: "renewableEnergyProductionManagementFacility",
      },
      { name: "도시·시설물·운영관리", tag: "cityFacilityOperationManagement" },
      { name: "전기요금 관리 서비스", tag: "electricityFeeManagementService" },
      { name: "전력 생산 및 공급", tag: "electricityProductionSupply" },
      { name: "전력 판매 및 통신", tag: "electricitySalesCommunication" },
    ],
  },
  {
    name: "금융",
    sub: [
      {
        name: "금융데이터 구축/서비스",
        tag: "financialDataConstructionService",
      },
      { name: "전자결제시스템", tag: "electronicPaymentSystem" },
      { name: "금융SW/ IT 서비스", tag: "financialSW_ITService" },
      { name: "모바일 뱅킹", tag: "mobileBanking" },
    ],
  },
  {
    name: "농업",
    sub: [
      {
        name: "농축산업 정보 제공 시스템",
        tag: "agricultureLivestockInformationSystem",
      },
      { name: "스마트 농장", tag: "smartFarm" },
    ],
  },
  {
    name: "문화예술",
    sub: [
      { name: "영상 전송 시스템", tag: "videoTransmissionSystem" },
      { name: "스마트 콘텐츠 서비스", tag: "smartContentService" },
      { name: "인공지능 창작", tag: "artificialIntelligenceCreation" },
      { name: "게임", tag: "game" },
      { name: "공연장 운영", tag: "performanceVenueOperation" },
    ],
  },
  {
    name: "물관리",
    sub: [
      { name: "스마트 워터 시티 사업", tag: "smartWaterCityBusiness" },
      {
        name: "실시간 누수 관측 및 제어 시스템",
        tag: "realTimeLeakageObservationControlSystem",
      },
      { name: "물 여과 시스템", tag: "waterFiltrationSystem" },
      {
        name: "자가진단형 하수처리장 기술",
        tag: "selfDiagnosticWastewaterTreatmentPlantTechnology",
      },
      { name: "스마트 미터링 서비스", tag: "smartMeteringService" },
      {
        name: "지능형 정수장 관리시스템",
        tag: "intelligentWaterPurificationManagementSystem",
      },
    ],
  },
  {
    name: "물류",
    sub: [
      { name: "자동 물류 시스템", tag: "automaticLogisticsSystem" },
      { name: "선박 운영 시스템", tag: "shipOperationSystem" },
      { name: "물류 관리시스템", tag: "logisticsManagementSystem" },
    ],
  },
  {
    name: "방범",
    sub: [
      { name: "실시간 위치 기반 서비스", tag: "realTimeLocationBasedService" },
      { name: "국방 시스템", tag: "nationalDefenseSystem" },
      { name: "공공공간 안전관리", tag: "publicSpaceSafetyManagement" },
      { name: "보안 시스템", tag: "securitySystem" },
      {
        name: "실시간 범죄 모니터링 시스템",
        tag: "realTimeCrimeMonitoringSystem",
      },
      { name: "지하공간 모니터링", tag: "undergroundSpaceMonitoring" },
    ],
  },
  {
    name: "방재",
    sub: [
      {
        name: "사고현장 실시간 대응서비스",
        tag: "realTimeResponseServiceForAccidentSite",
      },
      {
        name: "공공시설물 안전관리 서비스",
        tag: "publicFacilitySafetyManagementService",
      },
      {
        name: "자연재해 및 재난관리시스템",
        tag: "naturalDisasterAndDisasterManagementSystem",
      },
    ],
  },
  {
    name: "복지",
    sub: [{ name: "실버 케어 서비스", tag: "silverCareService" }],
  },
  {
    name: "비지니스",
    sub: [
      {
        name: "기업 운영 및 정보 관리",
        tag: "businessOperationAndInformationManagement",
      },
      { name: "스마트 마케팅 솔루션", tag: "smartMarketingSolution" },
      { name: "비즈니스 협력 지원", tag: "businessCollaborationSupport" },
      { name: "고객센터 운영", tag: "customerCenterOperation" },
      { name: "기업용 ICT 서비스", tag: "enterpriseICTService" },
      { name: "점포 무인화", tag: "storeAutomation" },
      { name: "전자상거래", tag: "eCommerce" },
    ],
  },
  {
    name: "시민참여",
    sub: [
      {
        name: "지역주민 참여 애플리케이션",
        tag: "localResidentsParticipationApplication",
      },
      { name: "시민 참여 시스템", tag: "citizenParticipationSystem" },
    ],
  },
  {
    name: "쓰레기처리",
    sub: [
      {
        name: "쓰레기 수거 경로 최적화",
        tag: "garbageCollectionRouteOptimization",
      },
      { name: "스마트 쓰레기통", tag: "smartTrashCan" },
      { name: "재활용 보상 서비스", tag: "recyclingRewardService" },
      { name: "대형 폐기물 처리 서비스", tag: "largeWasteDisposalService" },
      {
        name: "쓰레기 요금 자동 정산 시스템",
        tag: "garbageFeeAutomaticSettlementSystem",
      },
    ],
  },
  {
    name: "의료·보건",
    sub: [
      { name: "검진 및 재활 기기", tag: "examinationAndRehabilitationDevice" },
      { name: "스마트 헬스케어", tag: "smartHealthcare" },
      { name: "원격의료 시스템", tag: "remoteMedicalSystem" },
      {
        name: "디지털 의료정보 관리",
        tag: "digitalMedicalInformationManagement",
      },
      {
        name: "전염성 질병 감시 시스템",
        tag: "infectiousDiseaseSurveillanceSystem",
      },
      { name: "미래형 의료 산업", tag: "futureTypeMedicalIndustry" },
      { name: "공공시설 보건 관리", tag: "publicFacilitiesHealthManagement" },
      { name: "병원 운영 시스템", tag: "hospitalManagementSystem" },
    ],
  },
  {
    name: "전자정부",
    sub: [
      { name: "도시 관제 시스템", tag: "urbanControlSystem" },
      {
        name: "디지털 행정시스템 구축",
        tag: "digitalAdministrativeSystemConstruction",
      },
      { name: "디지털 정보 보안", tag: "digitalInformationSecurity" },
      { name: "디지털 문서화 및 투표", tag: "digitalDocumentationAndVoting" },
      { name: "데이터 분석", tag: "dataAnalysis" },
      {
        name: "국공유지 및 공간정보 관리시스템",
        tag: "nationalLandAndSpatialInformationManagementSystem",
      },
      { name: "지적재 조사 서비스", tag: "cadastralInvestigationService" },
    ],
  },
  {
    name: "통신기술",
    sub: [
      { name: "스마트 통신 연결", tag: "smartCommunicationConnection" },
      { name: "ICT 기술 및 모듈", tag: "ICTTechnologyAndModule" },
      { name: "데이터 이미지화", tag: "dataImaging" },
    ],
  },
];

export default categories;
