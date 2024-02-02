export const generateRandomDescription = () => {
  const minWords = 10 // 최소 단어 수
  const maxWords = 15 // 최대 단어 수

  const loremIpsum = `누구든지 체포 또는 구속을 당한 때에는 적부의 심사를 법원에 청구할 권리를 가진다. 국회는 상호원조 또는 안전보장에 관한 조약, 중요한 국제조직에 관한 조약, 우호통상항해조약, 주권의 제약에 관한 조약, 강화조약, 국가나 국민에게 중대한 재정적 부담을 지우는 조약 또는 입법사항에 관한 조약의 체결·비준에 대한 동의권을 가진다.
  사면·감형 및 복권에 관한 사항은 법률로 정한다. 국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며, 국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에 의하여 집회된다.
  국회의원과 정부는 법률안을 제출할 수 있다. 대통령은 제4항과 제5항의 규정에 의하여 확정된 법률을 지체없이 공포하여야 한다. 제5항에 의하여 법률이 확정된 후 또는 제4항에 의한 확정법률이 정부에 이송된 후 5일 이내에 대통령이 공포하지 아니할 때에는 국회의장이 이를 공포한다.
  대법원장은 국회의 동의를 얻어 대통령이 임명한다. 민주평화통일자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 의무교육은 무상으로 한다.
  대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 이 헌법시행 당시의 대법원장과 대법원판사가 아닌 법관은 제1항 단서의 규정에 불구하고 이 헌법에 의하여 임명된 것으로 본다.
  한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다. 나는 헌법을 준수하고 국가를 보위하며 조국의 평화적 통일과 국민의 자유와 복리의 증진 및 민족문화의 창달에 노력하여 대통령으로서의 직책을 성실히 수행할 것을 국민 앞에 엄숙히 선서합니다.
  공개하지 아니한 회의내용의 공표에 관하여는 법률이 정하는 바에 의한다. 정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이 정하는 바에 의하여 정당운영에 필요한 자금을 보조할 수 있다.
  법률안에 이의가 있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고, 그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다. 광물 기타 중요한 지하자원·수산자원·수력과 경제상 이용할 수 있는 자연력은 법률이 정하는 바에 의하여 일정한 기간 그 채취·개발 또는 이용을 특허할 수 있다.`
  const loremWords = loremIpsum.split(" ")

  // 랜덤 단어 수 생성
  const randomWordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords

  // 랜덤 단어로 설명 생성
  const randomDescription = Array.from(
    { length: randomWordCount },
    () => loremWords[Math.floor(Math.random() * loremWords.length)]
  ).join(" ")

  return randomDescription
}
