---
layout: default
title: HP Victus 16 홀 센서 교체 및 수리 (FU6, LA8) - 한국어 가이드
permalink: /ko-guide/
lang: ko
description: "HP Victus 16 화면 또는 키보드 백라이트 깜빡임과 갑작스러운 꺼짐: LA8 홀 센서(Toshiba TCS40DLR)를 Allegro A1126으로 교체하고 FU6 퓨즈를 바이패스하는 방법."
---
<div align="center">
  <h1>HP Victus 16 홀 효과 센서 고장과 해결 방법</h1>
  <p><b>Buğra Güngöz</b><br><i>EEE</i></p>
</div>

**이용 안내:** 출처를 밝히는 경우 인용할 수 있으며, 상업적으로 이용할 수 없습니다. 질문이나 의견이 있으면 gungozb@gmail.com으로 연락해 주십시오. 수리 요청은 보내지 마십시오!

**경고:** *이 문서에서 설명하는 하드웨어 개조에는 SMD 수준의 납땜 기술, 회로도 판독 능력, 전기 측정 지식이 필요합니다. 여기에 제시된 정보를 적용하는 과정에서 발생할 수 있는 하드웨어 손상, 데이터 손실 또는 부상에 대한 책임은 전적으로 작업자 본인에게 있습니다. 모든 물리적 개입은 제조사 보증을 무효로 만듭니다. 모든 작업은 반드시 기기의 전원을 차단하고 배터리 커넥터를 분리한 상태에서 해야 합니다. SMD 부품 패키지가 작고 보드의 작업 공간이 좁으므로 다른 부품이 손상되지 않도록 매우 주의해야 합니다. 가이드에서 언급하는 통전 상태의 전압 측정만이 유일한 예외이며, 해당 단계에 적힌 주의 사항을 지켜 수행해야 합니다.*

*잘못 수행한 작업의 결과에 대해 어떠한 책임도 지지 않습니다!*

---

<!-- slot:intro -->

## 1. 소개
이 글은 HP Victus 16 시리즈(특히 s0, r0 변형) 노트북에서 주로 높은 발열 부하 상태에서 나타나는 갑작스러운 시스템 종료, 검은 화면, 하드웨어 멈춤, 화면 깜빡임 같은 전형적인 증상을 가진 홀 효과 센서 고장의 분석과 해결 방법을 다룹니다. 고장의 근본 원인은 원래 장착된 홀 효과 센서가 사실상 이 설계와 열적으로 맞지 않는다는 점, 그리고 전원 라인에 있는 퓨즈가 잘못된 열 설계로 인해 열화된다는 점입니다. 원래 센서가 이 설계 때문에 왜 열적으로 불안정해지는지는 뒤에서 자세히 설명합니다. 문제는 홀 효과 센서 때문에 EC 칩이 잘못 트리거되어 시스템이 덮개가 닫혔다고 판단하고 키보드와 화면 백라이트를 끄는 형태로 나타납니다. 열 스트레스로 불안정하게 동작하는 센서 회로가 EC를 계속 잘못 트리거하기 때문에 화면과 키보드 백라이트가 무작위 간격으로 켜지고 꺼지거나 깜빡입니다.

이 문서에서 참고한 자료는 문서 끝의 참고 문헌에서 확인할 수 있습니다. 참고 자료에는 두 가지 주요 해결 방법이 소개되어 있으며, 이 문서는 두 방법을 함께 적용하는 데 초점을 맞추고 왜 둘 다 필요한지 뒤에서 자세히 설명합니다. 여기서 설명하는 작업은 제 노트북에 직접 적용했습니다. 수리한 지 아주 오래되지는 않았지만 더 이상 아무 문제가 없습니다. 장시간 발열 스트레스 테스트로 노트북에 부하를 주었고 모든 것이 정상적으로 동작하므로 문제가 해결되었다고 말할 수 있습니다.

---

## 2. 진단
키보드 백라이트가 꺼져 있다면 켜 두는 것이 좋습니다. 그러면 문제를 더 쉽게 관찰할 수 있고 화면만의 문제가 아니라는 것을 알 수 있습니다. 안타깝게도 소프트웨어적인 해결책은 없습니다. DDU로 내장 및 외장 그래픽 드라이버를 완전히 제거한 뒤 새로 설치했고 BIOS도 업데이트했습니다. 이보다 상위 수준의 소프트웨어 해결책은 없다고 생각하므로 운영체제를 다시 설치할 필요는 없습니다. 아무것도 효과가 없었습니다. Windows 전원 옵션에서 덮개를 닫을 때 "아무 것도 안 함"을 선택해도 문제는 사라지지 않습니다. 이 모든 시도에도 화면 깜빡임, 화면과 키보드 백라이트가 켜졌다 꺼지는 증상이 계속되었기 때문에 홀 효과 센서 고장이라고 확신하게 되었습니다.

고장의 주된 원인은 열화와 열적 불안정입니다. 그런데 이 열 스트레스는 홀 효과 센서에만 영향을 주는 것이 아니라 센서 전원 라인의 퓨즈도 손상시켜, 임피던스가 증가하는 형태의 열화를 일으킵니다. 원래 센서는 LA8 코드가 찍힌 Toshiba TCS40DLR이며, 아래는 원래 센서의 동작 조건에 대한 데이터시트 자료입니다.

<img alt="Victus16 Hall Effect Sensor Operating Conditions" src="https://github.com/user-attachments/assets/eedd46d0-9ef8-4678-9d09-5715da7cb701" loading="lazy" />

최대 동작 온도는 게이밍 노트북으로서는 매우 제한적인 수준입니다. Toshiba는 데이터시트에 이에 대한 주의 사항까지 적어 두었습니다:

<img alt="Toshiba Datasheet Reliability Warning" src="https://github.com/user-attachments/assets/1dad43f2-c007-4554-bb62-81e7b429138a" loading="lazy" />

결론적으로 어떤 하드웨어 개조를 하더라도 이 센서는 이 노트북 설계에 적합하지 않으며, 더 높은 온도를 견디는 다른 센서로 반드시 교체해야 합니다. 곧 설명할 센서 전원 라인의 퓨즈 바이패스만으로는 충분하지 않으며, 일정 시간이 지나면 원래 센서는 열 스트레스 때문에 다시 불안정하게 동작합니다.

---

## 3. 해결
문제의 원인은 홀 효과 센서만이 아닙니다. 위에서 말했듯이 이 센서 전원 라인의 퓨즈도 고장 납니다. 이 고장은 일반적인 퓨즈처럼 단선되는 방식이 아니라 열화 후 임피던스가 증가하는 방식으로 일어나며, 그 결과 전원 라인이 불안정해집니다. 퓨즈가 실제로 고장 났는지 확인하려면 저항을 측정하거나(회로에서 떼어 내지 않으면 확실한 결과를 얻을 수 없지만, 이 퓨즈에 병렬로 연결된 저항은 보이지 않았으므로 프로브를 충분히 오래 대고 있으면 대략적인 값을 얻을 수 있습니다) 도통 모드로 확인할 수 있습니다. 제가 회로 상태에서 측정한 저항은 260옴이었습니다. 이 값은 열 피로 정도에 따라 달라질 수 있습니다. 도통 테스트에서 부저는 울리지 않았고 멀티미터는 여전히 260옴을 표시했습니다. 측정 결과로 볼 때 퓨즈는 본래 기능을 확실히 잃었으며 이제 라인에 임피던스로 작용합니다. 다만 이 임피던스는 고장 상태에 따라 달라지며, 열 스트레스로 인해 퓨즈의 임피던스는 점점 더 커집니다.

<!-- slot:diagram -->


진짜 문제는 이 임피던스 증가로 인해 홀 효과 센서 전원 라인의 전압이 무너지는 것입니다. 참고 자료를 보면 홀 센서 전원을 IR 센서 전원에서 끌어오는 식의 개조가 바로 이 때문에 이루어졌지만, 그럴 필요는 없습니다. 이 글에서는 더 깔끔한 해결책으로 열화된 퓨즈를 바이패스하는 방법을 설명합니다. 회로에 전원이 들어간 상태에서(여기서는 주의해야 합니다. 프로브를 잘못 대면 단락이 생길 수 있습니다) 퓨즈에서 30mV의 전압 강하를 측정했습니다. 퓨즈의 임피던스가 더 높았다면 강하는 더 커지고 센서 전원 전압이 무너졌을 것입니다. 가장 중요한 점은, 제가 장착한 Allegro 센서는 동작 전류가 더 크기 때문에 이 고장 난 퓨즈가 있으면 라인 전압이 더 떨어지고 새 센서도 불안정하게 동작한다는 것입니다. 따라서 센서 교체만으로는 충분하지 않으며, 전원 라인을 안정시키려면 퓨즈 바이패스가 반드시 필요합니다.

퓨즈를 바이패스하는 것이 위험해 보일 수 있습니다. 이 퓨즈의 역할은 센서 보드나 센서 보드를 메인보드에 연결하는 FFC 케이블에서 단락이 생겼을 때 3V3 라인을 보호하는 것입니다. 즉, 센서 보드에 물리적 손상(눌린 케이블, 납 브리지, 액체 접촉 등)이 없다면 동작할 일이 없는 보호 장치입니다. 그런 경우에도 전원부의 레귤레이터 회로가 3V3 라인에 대한 자체 과전류 보호 기능을 갖고 있으므로 보호는 여전히 이루어집니다. 다만 레귤레이터의 보호 임계값은 암페어 단위이므로, 이 임계값보다 낮은 부분 단락에서는 케이블과 가는 패턴이 가열될 수 있습니다. 이 위험을 완전히 없애고 싶다면 바이패스 대신 적절한 정격의 새 퓨즈를 장착할 수 있습니다. 또한 Allegro 센서 데이터시트에 나오는 단락 보호는 센서의 출력 핀에 대한 것으로, 전원 라인이 아니라 출력 트랜지스터를 보호한다는 점도 짚어 두어야 합니다. 즉, 바이패스의 안전성은 이 기능이 아니라 레귤레이터의 보호에 기대고 있습니다. 이 글에서는 완전한 해결책을 제시하므로 다른 증상과 해결책은 다루지 않았습니다. 여기서 설명하는 작업을 적용할 수 없고 더 쉬운 방법을 찾는다면, 참고 문헌의 링크를 꼼꼼히 살펴보고 거기서 소개하는 몇 가지 간단한 방법을 시도해 볼 수 있습니다.

새 홀 효과 센서로는 Allegro A1126을 사용했습니다. 가장 빠르고 쉽게 구할 수 있어서 이 부품을 선택했으며, 원래 센서와 구매할 센서의 데이터시트를 비교해 다른 브랜드나 모델의 적합한 센서를 선택해도 됩니다. Allegro A1126은 차량용 등급 부품으로 원래 센서보다 열적으로 훨씬 튼튼하고, 앞서 말했듯이 단락 보호 출력 같은 기능도 갖추고 있습니다. Toshiba 센서와 가장 크게 다른 점은 전류를 소모하는 방식입니다. Toshiba 센서는 전류를 연속적으로 소모하지 않습니다. 데이터시트에 나와 있듯이 내부 회로가 주기적인 펄스 형태로 전류를 소모하므로, 3.3V에서 주어진 1.2mA는 이 펄스의 피크값이고 평균 전류는 이보다 훨씬 낮습니다. 제 측정도 이를 뒷받침합니다. 원래 센서가 장착된 상태에서 퓨즈 양단 30mV 강하와 퓨즈 저항 260옴을 측정했으며, 여기서 평균 전류는 30mV / 260Ω ≈ 115µA입니다(1.2mA를 연속으로 소모했다면 강하는 312mV였을 것입니다). 반면 Allegro 센서는 초퍼 안정화 방식으로 전류를 연속 소모하며, 데이터시트의 최대 공급 전류는 4mA입니다. 같은 고장 난 퓨즈라면 최악의 경우 퓨즈에서 4mA × 260Ω ≈ 1.04V가 강하되어 센서에는 약 2.26V만 도달하는데, 이는 최소 공급 전압 3V보다 한참 낮습니다. 반대로 보면 3.3V와 3V 사이의 0.3V 여유는 260옴 퓨즈에서 0.3V / 260Ω ≈ 1.15mA까지만 충분합니다. 데이터시트는 센서가 이 전류 아래에 머문다고 보장하지 않으며, 열 스트레스로 퓨즈 저항이 커질수록 이 한계는 더 낮아집니다(원래 센서는 2.3V까지 동작하므로 고장 난 퓨즈를 한동안 견딜 수 있었지만 Allegro에는 그런 여유가 없습니다). 따라서 퓨즈를 바이패스하지 않으면 새 센서는 안정적으로 동작할 수 없습니다.


노트북이 동작하는 동안의 온도는 훨씬 높겠지만, 공칭 조건에서 원래 Toshiba 홀 효과 센서의 데이터시트 자료는 다음과 같습니다:

Toshiba 센서의 3.3V 기준 1.2mA 요구 사항을 보여 주는 표:

<img alt="Toshiba Current Consumption Table" src="https://github.com/user-attachments/assets/2728d3a7-d420-4dde-bd3e-52f6d03ddd70" loading="lazy" />

Allegro 센서의 데이터시트 자료는 다음과 같습니다:

Allegro 센서의 최소 공급 전압, 전류 제한 최대값, 동작 상태의 공급 전류를 보여 주는 표:

<img alt="Allegro Electrical Characteristics Table" src="https://github.com/user-attachments/assets/4565e1dc-3f7f-47f6-b414-031f3b0ae486" loading="lazy" />

Allegro 센서 데이터시트 설명 부분의 과전류 보호에 관한 문구가 담긴 이미지:

<img alt="Allegro Overcurrent Protection Narrative" src="https://github.com/user-attachments/assets/af264158-5024-42a5-87cf-1398ab47dae9" loading="lazy" />

Allegro 센서의 동작 온도 범위를 보여 주는 표:

<img alt="Allegro Operating Temperature Limits" src="https://github.com/user-attachments/assets/1a727310-dff8-43d0-9b88-8aa4e556ccbe" loading="lazy" />

Allegro 센서의 최소 공급 전압이 3V라는 것을 알 수 있습니다. 그래서 센서 전원 라인은 반드시 안정적이어야 하며, 따라서 전원 라인의 고장 난 퓨즈(또는 시간이 지나 열 스트레스로 임피던스가 커지며 열화될 퓨즈)는 라인 전압이 절대 무너지지 않도록 반드시 바이패스해야 합니다(새로 장착하는 부품도 고온 내성이 높지 않다면 마찬가지로 열화됩니다. 최대 허용 강하는 0.3V밖에 되지 않습니다). 또한 데이터시트 설명에 나와 있듯이 60mA 전류 제한이 있습니다. 이 제한은 센서의 출력 전류에 대한 것으로, EC로 가는 출력 라인에서 단락이 생기면 센서 출력이 스스로를 보호합니다. 보시는 것처럼 Allegro 센서의 동작 온도 상한은 150°C로, 원래 센서의 상한인 85°C보다 65°C 높습니다.

원래 센서와 새 센서의 핀은 완전히 호환되므로 기존 센서를 떼어 내고 그 자리에 새 센서를 바로 납땜할 수 있습니다. Toshiba 센서는 SOT-23F, Allegro 센서는 SOT-23W 패키지이며 두 패키지는 서로 호환됩니다.

Toshiba 센서의 핀 배치도:

<img alt="Toshiba Pinout Diagram" src="https://github.com/user-attachments/assets/78919efa-1adc-40e4-9c5b-60211b4ee484" loading="lazy" />

Allegro 센서의 핀 배치도:

<img alt="Allegro Pinout Diagram" src="https://github.com/user-attachments/assets/b57c2697-5b96-42e7-849d-b27661cbcc0e" loading="lazy" />

센서가 있는 보드에 접근하려면 HP 유지보수 가이드의 단계를 따르면 됩니다:

메인보드를 분리하기 전에 먼저 분리해야 하는 모든 케이블을 보여 주는 이미지:

<img alt="Motherboard Cable Disconnection Mapping" src="https://github.com/user-attachments/assets/bfaacb83-548e-4ca1-b132-b8ab5a3ff457" loading="lazy" />

메인보드 분리 과정을 보여 주는 이미지:

<img alt="Motherboard Disassembly Steps" src="https://github.com/user-attachments/assets/4f52088a-cd33-4b4f-aa14-c7c042a5c140" loading="lazy" />

홀 센서가 있는 보드의 분리 과정을 보여 주는 이미지:

<img alt="Sensor Board Detachment Step" src="https://github.com/user-attachments/assets/6237f31e-8dce-45ea-9878-38d4f6b2ae4d" loading="lazy" />

보시는 것처럼 홀 효과 센서가 있는 보드에 접근하려면 메인보드 전체를 섀시에서 꺼내야 합니다. 여기까지의 모든 작업은 HP 유지보수 및 서비스 가이드를 꼼꼼히 참고해야 하며, 가이드 링크는 참고 문헌에 있습니다.

홀 센서 보드(IR 센서 면) 사진:

<img alt="Daughterboard IR Sensor Side" src="https://github.com/user-attachments/assets/22240520-363c-4405-bb39-cab0ff47f7e1" loading="lazy" />

홀 센서 보드(홀 센서 면) 사진:

<img alt="Daughterboard Hall Sensor Side" src="https://github.com/user-attachments/assets/0b367bbf-e471-4a2d-8a5c-6cf2ab95c79f" loading="lazy" />

센서 보드 사진은 위에서 볼 수 있으며, 더 높은 해상도의 사진은 마지막에 있는 링크에서 볼 수 있습니다.

홀 센서 보드(홀 센서 면) 근접 사진:

<img alt="Macro Shot of Hall Sensor Layout" src="https://github.com/user-attachments/assets/7465b064-9eb6-45aa-98ec-f5dcc1c6e522" loading="lazy" />

Toshiba 센서는 열풍 리워크 스테이션이나 인두로 떼어 낼 수 있고, Allegro 센서는 바로 장착할 수 있습니다:

A1126으로 교체한 홀 센서 보드(홀 센서 면) 사진:

<img alt="Post Replacement State with Allegro A1126" src="https://github.com/user-attachments/assets/3c141737-f8c9-4d9d-97e5-86d09733c698" loading="lazy" />

보시는 것처럼 센서 바로 옆에 커패시터 두 개가 있습니다. 패키지가 매우 작아서 실수로 떨어지면 다시 납땜하기 어렵습니다. 또한 열풍기를 사용하면 JIR2 소켓이 열에 녹거나 손상될 수 있습니다. 그래서 작업 전에 센서 주변과 약한 소켓을 캡톤 테이프로 덮어야 합니다. 교체 후에는 물리적 보강을 위해 센서 위에 캡톤 테이프를 한두 겹 붙일 수 있습니다. 추가 조치로 캡톤 테이프 층 사이에 테플론 테이프를 넣어 얇은 단열 블록을 만들 수도 있는데, 직접 해 보니 이 블록은 한쪽에서 다른 쪽으로 열을 거의 전달하지 않았습니다. 다만 이 블록은 위쪽에서 센서로 오는 열만 줄일 뿐, 보드의 구리 패턴과 핀을 통해 전달되는 열은 막지 못합니다. Allegro 센서는 이미 온도 내성이 충분하므로 필요하지 않으며, 원래 센서를 계속 쓰는 경우나 FU6 자리에 장착한 새 퓨즈 또는 0옴 저항을 위한 간단한 추가 보호로 생각할 수 있습니다(FU6 위에 적용한다면 히트싱크가 제대로 밀착되는 것을 방해하지 않는지 확인하십시오). 블록은 얇게 유지해야 합니다. 너무 두꺼우면 센서 보드와 메인보드 사이에서 부풀어 보드에 압력을 줍니다. 이것으로 센서 보드 작업은 끝입니다.

앞서 말한 퓨즈를 작업하려면 센서 보드와 메인보드를 다시 장착한 다음 구리 쿨링 파이프를 분리해야 합니다. 구리 파이프를 분리하지 않고도 센서를 육안으로 확인하고 필요한 저항, 도통, 전압 측정을 할 수 있지만, 보드에서 물리적으로 작업하려면 히트싱크 분리가 필수입니다. 히트싱크 나사를 푼 뒤 90도 각도로 조심스럽게 들어 올리고, 서멀 퍼티가 아직 말랑하다면 그대로 두어야 합니다(마르고 부서진다면 교체해야 합니다). 쿨링 블록을 분리했으므로 새 서멀 페이스트 도포는 필수이며, 구리 파이프를 다시 장착할 때는 지정된 순서대로 나사를 조여야 합니다.

퓨즈는 FU6로 표기되어 있으며, 홀 센서와 IR 센서가 있는 보드가 메인보드에 연결되는 JIR1 소켓 바로 옆에 있습니다.

<!-- slot:variant -->


FU6 퓨즈 근접 사진:

<img alt="FU6 Fuse Macro Placement" src="https://github.com/user-attachments/assets/79d82752-efc3-4f26-b131-cfec5d1c2114" loading="lazy" />

FU6 퓨즈 광각 사진:

<img alt="FU6 Heatsink Relative Position" src="https://github.com/user-attachments/assets/30dde8d7-a056-44ac-bcf5-48bd6083d47e" loading="lazy" />

FU6 퓨즈 초근접 사진:

<img alt="High Magnification View of FU6 Solder Joint" src="https://github.com/user-attachments/assets/d0c24470-7b7c-405b-a397-3424e1f06495" loading="lazy" />

원래 퓨즈의 정확한 사양은 찾지 못했습니다. 맞는 패키지의 약 100-200mA 정격 교체용 퓨즈나 적합한 패키지의 0옴 저항을 장착할 수 있을 것으로 생각합니다. 하지만 지속적인 열 스트레스를 고려하면 교체가 장기적으로 합리적인 해결책이라고 보지 않으며, 그래서 퓨즈를 완전히 제거하고 납 브리지로 바이패스했습니다.

FU6 퓨즈를 제거한 상태의 근접 사진:

<img alt="Exposed Pads After Desoldering FU6" src="https://github.com/user-attachments/assets/3182a871-0657-4c5b-b8e4-51107a93122b" loading="lazy" />

부품을 패드에서 떼어 낸 뒤 FU6 퓨즈 자리를 납 브리지로 바이패스했고, 멀티미터로 확인하여(보드에 전원이 들어간 상태에서는 각별히 주의해야 합니다) 3.3V가 소켓의 핀에 문제없이 도달하는 것을 확인했습니다.

납 브리지로 바이패스한 FU6 퓨즈 사진:

<img alt="Final Solder Bridge Bypass on FU6" src="https://github.com/user-attachments/assets/4c2260ed-0f74-4f58-9619-de3497ee7953" loading="lazy" />

이 확인은 보드 전원이 없는 상태에서도, 소켓에 가장 가까운 퓨즈 패드와 소켓 핀 사이의 도통을 확인하여 어느 핀에 3V3 전압이 흘러야 하는지 정확히 파악하는 방식으로 해야 합니다. 모든 납땜 작업 후에는 도통 테스트로 납땜 상태를 꼼꼼히 확인해야 합니다.

<!-- slot:checklist -->


---

## 4. 참고 문헌

1. **[Reddit: HP Victus 16 Hall Effect Sensor Megathread](https://www.reddit.com/r/HPVictus/comments/1pzcl91/victus_16_hall_effect_sensor_megathread_laptop/)**
   작성자: [RaguTom](https://www.reddit.com/user/RaguTom/)

2. **[BADCAPS: HP Victus 16 Hall Effect Sensor Problem](https://www.badcaps.net/forum/troubleshooting-hardware-devices-and-electronics-theory/troubleshooting-laptops-tablets-and-mobile-devices/3822460-hp-victus-16-hall-effect-sensor-problem)**
   작성자: [mitchw](https://www.badcaps.net/member/199143-mitchw)

3. **[Maintenance and Service Guide Victus by HP 16.1 inch](https://kaas.hpcloud.hp.com/pdf-public/pdf_7911438_en-US-1.pdf)**

4. **[Toshiba TCS40DLR Datasheet](https://toshiba.semicon-storage.com/info/TCS40DLR_datasheet_en_20150403.pdf?did=30105&prodName=TCS40DLR)**

5. **[Allegro A1126 Datasheet](https://www.allegromicro.com/~/media/Files/Datasheets/A1126-Datasheet.ashx)**

---

## 5. 추가 이미지

**[Google Drive 폴더를 열려면 여기를 클릭하십시오](https://drive.google.com/drive/folders/1yIsKV0Ez4vL3xuzYP01oauqGa7uJhQD5?usp=sharing)**

## **Bugra**
