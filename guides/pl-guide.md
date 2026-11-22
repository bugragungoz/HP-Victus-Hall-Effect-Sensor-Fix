---
layout: default
title: HP Victus 16 wymiana czujnika Halla i naprawa (FU6, LA8) - poradnik po polsku
permalink: /pl-guide/
lang: pl
description: "HP Victus 16 z migającym ekranem lub podświetleniem klawiatury i nagłymi wyłączeniami: wymiana czujnika Halla LA8 (Toshiba TCS40DLR) na Allegro A1126 i zmostkowanie bezpiecznika FU6."
---
<div align="center">
  <h1>Awaria czujnika Halla w HP Victus 16 i jej rozwiązanie</h1>
  <p><b>Buğra Güngöz</b><br><i>EEE</i></p>
</div>

**Wykorzystanie:** Można cytować pod warunkiem podania źródła; nie wolno wykorzystywać komercyjnie. Jeśli masz pytania lub uwagi, możesz napisać na adres gungozb@gmail.com; nie wysyłaj próśb o naprawę!

**OSTRZEŻENIE:** *Modyfikacje sprzętowe opisane w tej dokumentacji wymagają umiejętności lutowania na poziomie SMD, czytania schematów i wiedzy z zakresu pomiarów elektrycznych. Odpowiedzialność za ewentualne uszkodzenia sprzętu, utratę danych lub obrażenia, do których może dojść podczas stosowania przedstawionych tu informacji, spoczywa wyłącznie na osobie, która je stosuje. Każda fizyczna ingerencja powoduje utratę gwarancji producenta. Podczas wszystkich czynności urządzenie musi być bezwzględnie odłączone od zasilania, a złącze baterii rozłączone. Ponieważ obudowy elementów SMD są małe, a obszar pracy na płycie ciasny, trzeba zachować szczególną ostrożność, aby nie uszkodzić innych elementów. Jedynym wyjątkiem są opisane w poradniku pomiary napięcia pod zasilaniem, które należy wykonywać z zachowaniem środków ostrożności podanych w odpowiednich krokach.*

*NIE PONOSZĘ ŻADNEJ ODPOWIEDZIALNOŚCI ZA SKUTKI BŁĘDNIE WYKONANYCH CZYNNOŚCI!*

---

<!-- slot:intro -->

## 1. Wprowadzenie
Ten artykuł opisuje analizę i sposób naprawy awarii czujnika Halla, której typowe objawy to nagłe wyłączenie systemu, czarny ekran, zawieszenie sprzętu i migotanie ekranu, występujące głównie przy dużym obciążeniu termicznym w laptopach z serii HP Victus 16 (zwłaszcza w wariantach s0 i r0). Główną przyczyną awarii jest to, że oryginalny czujnik Halla jest w rzeczywistości termicznie niedopasowany do konstrukcji, a bezpiecznik na linii zasilania ulega degradacji termicznej z powodu wadliwego projektu termicznego. Dlaczego oryginalny czujnik traci stabilność termiczną z powodu tej konstrukcji, wyjaśniam w dalszych częściach. Problem polega na tym, że układ EC, błędnie wyzwalany przez czujnik Halla, uznaje pokrywę za zamkniętą i wyłącza podświetlenie klawiatury i ekranu. Ponieważ obwód czujnika, pracujący niestabilnie pod wpływem obciążenia termicznego, stale błędnie wyzwala EC, ekran i podświetlenie klawiatury losowo włączają się i wyłączają oraz migoczą.

Źródła wykorzystane w tej dokumentacji znajdują się w bibliografii na końcu dokumentu. W podanych źródłach opisano dwie główne metody naprawy; ta dokumentacja skupia się na zastosowaniu obu jednocześnie, a w dalszych częściach wyjaśniam, dlaczego obie są potrzebne. Wszystko, co tu opisuję, wykonałem osobiście na własnym komputerze; od naprawy nie minęło dużo czasu, ale nie mam już żadnych problemów. Długo obciążałem komputer testami termicznymi i wszystko działa normalnie; mogę powiedzieć, że problem został rozwiązany.

---

## 2. Diagnoza
Jeśli podświetlenie klawiatury jest wyłączone, warto je włączyć: łatwiej wtedy zaobserwować problem i zauważyć, że nie dotyczy on wyłącznie ekranu. Niestety nie istnieje rozwiązanie programowe. Za pomocą DDU całkowicie usunąłem sterowniki zintegrowanej i dedykowanej karty graficznej i zainstalowałem je od nowa, zaktualizowałem BIOS i poza tym nie sądzę, by istniało rozwiązanie programowe wyższego poziomu, więc nie ma sensu reinstalować systemu. Nic z tego nie pomogło. Problem nie znika nawet po wybraniu w opcjach zasilania Windows ustawienia „Nic nie rób” po zamknięciu pokrywy. Ponieważ mimo wszystkich tych prób nadal występowały objawy takie jak migotanie ekranu oraz włączanie i wyłączanie podświetlenia ekranu i klawiatury, upewniłem się, że przyczyną jest awaria czujnika Halla.

Główną przyczyną awarii jest degradacja termiczna i niestabilność termiczna. Obciążenie termiczne nie dotyka jednak tylko czujnika Halla: uszkadza również bezpiecznik na linii zasilania czujnika, który ulega degradacji termicznej objawiającej się wzrostem impedancji. Oryginalny czujnik to Toshiba TCS40DLR z oznaczeniem LA8; poniżej znajdują się dane z karty katalogowej dotyczące jego warunków pracy.

<img alt="Victus16 Hall Effect Sensor Operating Conditions" src="https://github.com/user-attachments/assets/eedd46d0-9ef8-4678-9d09-5715da7cb701" loading="lazy" />

Maksymalna temperatura pracy jest bardzo ograniczona jak na laptopa do gier. Toshiba zamieściła nawet w karcie katalogowej uwagę na ten temat:

<img alt="Toshiba Datasheet Reliability Warning" src="https://github.com/user-attachments/assets/1dad43f2-c007-4554-bb62-81e7b429138a" loading="lazy" />

W rezultacie, niezależnie od tego, jaką modyfikację sprzętową się wykona, ten czujnik nie jest odpowiednim wyborem dla tej konstrukcji; konieczna jest jego wymiana na czujnik o wyższej odporności temperaturowej. Opisane za chwilę zmostkowanie bezpiecznika na linii zasilania czujnika samo w sobie nie wystarczy: po pewnym czasie oryginalny czujnik znów zacznie pracować niestabilnie z powodu obciążenia termicznego.

---

## 3. Rozwiązanie
Czujnik Halla nie jest jedynym źródłem problemu; jak wspomniałem wyżej, uszkodzeniu ulega także bezpiecznik na linii zasilania tego czujnika. To uszkodzenie nie polega na przerwie w obwodzie, jak przy klasycznym przepaleniu bezpiecznika, lecz na wzroście impedancji po degradacji termicznej, co powoduje niestabilność linii zasilania. Aby sprawdzić, czy bezpiecznik rzeczywiście jest uszkodzony, można zmierzyć rezystancję (bez wylutowania z obwodu wynik nie jest jednoznaczny, ale nie zauważyłem rezystora równoległego do tego bezpiecznika, więc przy dłuższym przytrzymaniu sond można uzyskać przybliżony wynik) albo sprawdzić go w trybie testu ciągłości. Mój pomiar rezystancji w obwodzie wyniósł 260 omów. Wartość ta może się zmieniać w zależności od zmęczenia termicznego. W teście ciągłości brzęczyk się nie odezwał, a multimetr nadal pokazywał 260 omów. Według moich pomiarów bezpiecznik zdecydowanie stracił swoją funkcję i stanowi teraz impedancję na linii. Ta impedancja zależy jednak od stanu uszkodzenia: pod wpływem obciążenia termicznego impedancja bezpiecznika będzie stopniowo rosła.

<!-- slot:diagram -->


Prawdziwym problemem jest spadek napięcia na linii zasilania czujnika Halla spowodowany tym wzrostem impedancji. Jak widać w źródłach, z tego właśnie powodu stosowano modyfikacje takie jak doprowadzenie zasilania czujnika Halla z zasilania czujnika IR, ale nie są one potrzebne. W tym artykule opisuję czystsze rozwiązanie: zmostkowanie zdegradowanego bezpiecznika. Przy włączonym zasilaniu obwodu (tu trzeba uważać, błędny kontakt sondy może spowodować zwarcie) zmierzyłem na bezpieczniku spadek 30 mV; gdyby impedancja bezpiecznika była wyższa, spadek byłby większy, a napięcie zasilania czujnika by się załamało. Najważniejsze jest to, że przez ten uszkodzony bezpiecznik, ponieważ zamontowany przeze mnie czujnik Allegro ma wyższy prąd pracy, napięcie na linii spadnie jeszcze bardziej i nowy czujnik również będzie pracował niestabilnie. Dlatego sama wymiana czujnika nie wystarczy: aby ustabilizować linię zasilania, zmostkowanie bezpiecznika jest konieczne.

Mostkowanie bezpiecznika może wyglądać na niebezpieczne podejście. Zadaniem tego bezpiecznika jest ochrona linii 3V3 na wypadek zwarcia na płytce czujnika lub na taśmie FFC łączącej ją z płytą główną; nie jest to więc zabezpieczenie, które powinno zadziałać, jeśli płytka czujnika nie jest fizycznie uszkodzona (zgnieciona taśma, mostek z cyny, kontakt z cieczą itp.). Nawet w takim przypadku ochrona nadal istnieje, ponieważ układy regulatorów w sekcji zasilania mają własne zabezpieczenie nadprądowe linii 3V3. Ponieważ jednak próg zadziałania regulatora jest rzędu amperów, częściowe zwarcie poniżej tego progu może nagrzewać taśmę i cienkie ścieżki; kto chce całkowicie wyeliminować to ryzyko, może zamiast mostka wlutować nowy bezpiecznik o odpowiedniej wartości. Trzeba też zaznaczyć, że zabezpieczenie przed zwarciem opisane w karcie katalogowej czujnika Allegro dotyczy pinu wyjściowego czujnika: chroni tranzystor wyjściowy, a nie linię zasilania; bezpieczeństwo mostka opiera się więc na zabezpieczeniu regulatora, a nie na tym. Ponieważ w artykule przedstawiam pełne rozwiązanie, nie uznałem za konieczne omawiania innych objawów i rozwiązań. Jeśli zastosowanie opisanych tu czynności nie jest możliwe i szukasz prostszego obejścia, możesz spróbować kilku prostych rozwiązań opisanych w linkach z bibliografii, uważnie je przeglądając.

Jako nowy czujnik Halla zastosowałem Allegro A1126. Wybrałem go, bo mogłem go najszybciej i najłatwiej zdobyć; porównując karty katalogowe oryginalnego czujnika i tego, który chcesz kupić, można wybrać również odpowiedni czujnik innej marki lub modelu. Allegro A1126 to element klasy motoryzacyjnej, termicznie znacznie bardziej wytrzymały od oryginału; ma też, jak wspomniałem, wyjście zabezpieczone przed zwarciem. Najważniejsza różnica w stosunku do czujnika Toshiba to sposób poboru prądu. Czujnik Toshiba nie pobiera prądu w sposób ciągły: zgodnie z kartą katalogową jego układ wewnętrzny pobiera prąd okresowymi impulsami; podana dla 3,3 V wartość 1,2 mA to szczyt tych impulsów, a prąd średni jest znacznie mniejszy. Moje pomiary to potwierdzają: z zamontowanym oryginalnym czujnikiem zmierzyłem spadek 30 mV na bezpieczniku i 260 omów rezystancji bezpiecznika, co daje prąd średni 30 mV / 260 Ω ≈ 115 µA (przy ciągłym poborze 1,2 mA spadek wyniósłby 312 mV). Czujnik Allegro jest natomiast czujnikiem ze stabilizacją chopperową, który pobiera prąd w sposób ciągły, a jego karta katalogowa podaje maksymalny prąd zasilania 4 mA. Przy tym samym uszkodzonym bezpieczniku w najgorszym przypadku spadek na bezpieczniku wyniesie 4 mA × 260 Ω ≈ 1,04 V, czyli do czujnika dotrze około 2,26 V, znacznie poniżej minimalnego napięcia zasilania 3 V. Patrząc odwrotnie, zapas 0,3 V między 3,3 V a 3 V przy bezpieczniku 260 omów wystarcza tylko do 0,3 V / 260 Ω ≈ 1,15 mA; karta katalogowa nie gwarantuje, że czujnik pozostanie poniżej tego prądu, a w miarę jak rezystancja bezpiecznika rośnie pod wpływem temperatury, ta granica będzie jeszcze niższa (oryginalny czujnik mógł przez jakiś czas tolerować uszkodzony bezpiecznik, bo działa do 2,3 V; Allegro nie ma takiego zapasu). W związku z tym bez zmostkowania bezpiecznika nowy czujnik nie może pracować stabilnie.


Podczas pracy laptopa temperatura będzie znacznie wyższa, ale dane z karty katalogowej oryginalnego czujnika Toshiba w warunkach nominalnych są następujące:

Tabela pokazująca wymaganie 1,2 mA przy 3,3 V dla czujnika Toshiba:

<img alt="Toshiba Current Consumption Table" src="https://github.com/user-attachments/assets/2728d3a7-d420-4dde-bd3e-52f6d03ddd70" loading="lazy" />

Dane z karty katalogowej czujnika Allegro są następujące:

Tabela pokazująca minimalne napięcie zasilania, maksymalną wartość ograniczenia prądu i prąd zasilania w stanie pracy czujnika Allegro:

<img alt="Allegro Electrical Characteristics Table" src="https://github.com/user-attachments/assets/4565e1dc-3f7f-47f6-b414-031f3b0ae486" loading="lazy" />

Obraz z tekstem o zabezpieczeniu nadprądowym z części opisowej karty katalogowej czujnika Allegro:

<img alt="Allegro Overcurrent Protection Narrative" src="https://github.com/user-attachments/assets/af264158-5024-42a5-87cf-1398ab47dae9" loading="lazy" />

Tabela pokazująca zakres temperatur pracy czujnika Allegro:

<img alt="Allegro Operating Temperature Limits" src="https://github.com/user-attachments/assets/1a727310-dff8-43d0-9b88-8aa4e556ccbe" loading="lazy" />

Widać, że minimalne napięcie zasilania czujnika Allegro wynosi 3 V. Dlatego linia zasilania czujnika musi być bezwzględnie stabilna; w związku z tym uszkodzony bezpiecznik na linii zasilania (albo taki, który z czasem ulegnie degradacji pod wpływem temperatury i zwiększy swoją impedancję) trzeba zmostkować (jeśli nowo wlutowany element również nie ma wysokiej odporności temperaturowej, ulegnie podobnej degradacji), aby napięcie na linii nigdy się nie załamało (maksymalny zapas spadku to zaledwie 0,3 V). Ponadto, jak podano w tekście opisowym karty katalogowej, występuje ograniczenie prądu 60 mA. To ograniczenie dotyczy prądu wyjściowego czujnika, czyli w razie zwarcia na linii wyjściowej idącej do EC wyjście czujnika samo się zabezpieczy. Jak widać, górna granica temperatury pracy czujnika Allegro wynosi 150 °C, czyli o 65 °C więcej niż 85 °C oryginalnego czujnika.

Piny oryginalnego i nowego czujnika są w pełni zgodne, więc można wylutować stary i wlutować nowy bezpośrednio na jego miejsce; czujnik Toshiba ma obudowę SOT-23F, a czujnik Allegro obudowę SOT-23W, i obie obudowy są ze sobą zgodne.

Rozkład pinów czujnika Toshiba:

<img alt="Toshiba Pinout Diagram" src="https://github.com/user-attachments/assets/78919efa-1adc-40e4-9c5b-60211b4ee484" loading="lazy" />

Rozkład pinów czujnika Allegro:

<img alt="Allegro Pinout Diagram" src="https://github.com/user-attachments/assets/b57c2697-5b96-42e7-849d-b27661cbcc0e" loading="lazy" />

Aby dostać się do płytki, na której znajduje się czujnik, można postępować zgodnie z krokami z instrukcji serwisowej HP:

Obraz pokazujący wszystkie przewody, które trzeba najpierw odłączyć, aby wyjąć płytę główną:

<img alt="Motherboard Cable Disconnection Mapping" src="https://github.com/user-attachments/assets/bfaacb83-548e-4ca1-b132-b8ab5a3ff457" loading="lazy" />

Obraz pokazujący wyjmowanie płyty głównej:

<img alt="Motherboard Disassembly Steps" src="https://github.com/user-attachments/assets/4f52088a-cd33-4b4f-aa14-c7c042a5c140" loading="lazy" />

Obraz pokazujący wyjmowanie płytki, na której znajduje się czujnik Halla:

<img alt="Sensor Board Detachment Step" src="https://github.com/user-attachments/assets/6237f31e-8dce-45ea-9878-38d4f6b2ae4d" loading="lazy" />

Jak widać, aby dostać się do płytki z czujnikiem Halla, trzeba wyjąć całą płytę główną z obudowy. Przy wszystkich czynnościach do tego momentu należy uważnie korzystać z instrukcji serwisowej HP; link znajduje się w bibliografii.

Zdjęcie płytki czujnika Halla (strona czujnika IR):

<img alt="Daughterboard IR Sensor Side" src="https://github.com/user-attachments/assets/22240520-363c-4405-bb39-cab0ff47f7e1" loading="lazy" />

Zdjęcie płytki czujnika Halla (strona czujnika Halla):

<img alt="Daughterboard Hall Sensor Side" src="https://github.com/user-attachments/assets/0b367bbf-e471-4a2d-8a5c-6cf2ab95c79f" loading="lazy" />

Zdjęcia płytki czujnika widać powyżej; wersje w wyższej rozdzielczości są dostępne pod linkiem na końcu.

Zbliżenie płytki czujnika Halla (strona czujnika Halla):

<img alt="Macro Shot of Hall Sensor Layout" src="https://github.com/user-attachments/assets/7465b064-9eb6-45aa-98ec-f5dcc1c6e522" loading="lazy" />

Czujnik Toshiba można wylutować stacją na gorące powietrze lub lutownicą, a czujnik Allegro wlutować bezpośrednio:

Zdjęcie płytki czujnika Halla (strona czujnika Halla) po wymianie na A1126:

<img alt="Post Replacement State with Allegro A1126" src="https://github.com/user-attachments/assets/3c141737-f8c9-4d9d-97e5-86d09733c698" loading="lazy" />

Jak widać, tuż obok czujnika znajdują się dwa kondensatory; ich obudowy są bardzo małe, więc jeśli przypadkiem odpadną, trudno będzie je przylutować z powrotem. Poza tym przy użyciu gorącego powietrza złącze JIR2 może się stopić lub uszkodzić od temperatury. Dlatego przed zabiegiem obszar wokół czujnika i wrażliwe złącze należy zabezpieczyć taśmą kapton. Po wymianie można nakleić na czujnik jedną lub dwie warstwy taśmy kapton jako wzmocnienie mechaniczne. Dodatkowo można wykonać cienki blok izolacyjny, wkładając taśmę teflonową między warstwy kaptonu; próbowałem tego i blok prawie nie przewodzi ciepła z jednej strony na drugą. Taki blok ogranicza jednak tylko ciepło docierające do czujnika od góry; nie zatrzyma ciepła, które dociera przez miedziane ścieżki i piny na płytce. Ponieważ odporność temperaturowa czujnika Allegro jest już wystarczająca, w jego przypadku nie jest to potrzebne; można to traktować jako prostą dodatkową ochronę dla tych, którzy nadal używają oryginalnego czujnika, albo dla nowego bezpiecznika lub rezystora 0 Ω wlutowanego w miejsce FU6 (jeśli stosujesz go na FU6, upewnij się, że nie przeszkadza w prawidłowym dociśnięciu radiatora). Blok musi być cienki: zbyt gruby wybrzusza się między płytką czujnika a płytą główną i naciska na płytkę. Praca na płytce czujnika jest zakończona.

Aby zająć się wspomnianym bezpiecznikiem, trzeba ponownie zamontować płytkę czujnika i płytę główną, a następnie zdjąć miedziane rurki chłodzenia. Czujnik można obejrzeć i wykonać potrzebne pomiary rezystancji, ciągłości i napięcia bez zdejmowania rurek, ale do fizycznej pracy na płycie zdjęcie radiatora jest konieczne. Po odkręceniu śrub radiatora należy go ostrożnie unieść pod kątem 90 stopni; jeśli thermal putty jest wciąż miękki, trzeba go zostawić bez zmian (jeśli jest suchy i kruchy, wymaga wymiany). Ponieważ blok chłodzenia zostaje zdjęty, nałożenie świeżej pasty termoprzewodzącej jest obowiązkowe, a przy ponownym montażu rurek śruby trzeba dokręcić w podanej kolejności.

Bezpiecznik jest oznaczony jako FU6 i znajduje się tuż obok złącza JIR1, przez które płytka z czujnikiem Halla i czujnikiem IR łączy się z płytą główną.

<!-- slot:variant -->


Zbliżenie bezpiecznika FU6:

<img alt="FU6 Fuse Macro Placement" src="https://github.com/user-attachments/assets/79d82752-efc3-4f26-b131-cfec5d1c2114" loading="lazy" />

Szerokie ujęcie bezpiecznika FU6:

<img alt="FU6 Heatsink Relative Position" src="https://github.com/user-attachments/assets/30dde8d7-a056-44ac-bcf5-48bd6083d47e" loading="lazy" />

Bardzo duże zbliżenie bezpiecznika FU6:

<img alt="High Magnification View of FU6 Solder Joint" src="https://github.com/user-attachments/assets/d0c24470-7b7c-405b-a397-3424e1f06495" loading="lazy" />

Nie znalazłem dokładnych danych oryginalnego bezpiecznika; zakładam, że można wlutować bezpiecznik zastępczy o wartości około 100-200 mA w pasującej obudowie albo rezystor 0 Ω w odpowiedniej obudowie. Biorąc jednak pod uwagę ciągłe obciążenie termiczne, nie uważam wymiany za rozsądne rozwiązanie długoterminowe; dlatego całkowicie usunąłem bezpiecznik i zmostkowałem go cyną.

Zbliżenie miejsca po wylutowanym bezpieczniku FU6:

<img alt="Exposed Pads After Desoldering FU6" src="https://github.com/user-attachments/assets/3182a871-0657-4c5b-b8e4-51107a93122b" loading="lazy" />

Po zdjęciu elementu z padów zmostkowałem miejsce po bezpieczniku FU6 cyną i, sprawdzając multimetrem (przy zasilonej płycie należy zachować szczególną ostrożność), upewniłem się, że 3,3 V bez problemu dociera do pinu złącza.

Zdjęcie bezpiecznika FU6 zmostkowanego cyną:

<img alt="Final Solder Bridge Bypass on FU6" src="https://github.com/user-attachments/assets/4c2260ed-0f74-4f58-9619-de3497ee7953" loading="lazy" />

To sprawdzenie należy wykonać także przy odłączonym zasilaniu, testując ciągłość między padem bezpiecznika najbliższym złącza a pinami złącza, aby ustalić dokładnie, który pin ma przenosić napięcie 3V3. Po wszystkich lutowaniach trzeba dokładnie sprawdzić jakość połączeń testem ciągłości.

<!-- slot:checklist -->


---

## 4. Bibliografia

1. **[Reddit: HP Victus 16 Hall Effect Sensor Megathread](https://www.reddit.com/r/HPVictus/comments/1pzcl91/victus_16_hall_effect_sensor_megathread_laptop/)**
   Autor: [RaguTom](https://www.reddit.com/user/RaguTom/)

2. **[BADCAPS: HP Victus 16 Hall Effect Sensor Problem](https://www.badcaps.net/forum/troubleshooting-hardware-devices-and-electronics-theory/troubleshooting-laptops-tablets-and-mobile-devices/3822460-hp-victus-16-hall-effect-sensor-problem)**
   Autor: [mitchw](https://www.badcaps.net/member/199143-mitchw)

3. **[Maintenance and Service Guide Victus by HP 16.1 inch](https://kaas.hpcloud.hp.com/pdf-public/pdf_7911438_en-US-1.pdf)**

4. **[Toshiba TCS40DLR Datasheet](https://toshiba.semicon-storage.com/info/TCS40DLR_datasheet_en_20150403.pdf?did=30105&prodName=TCS40DLR)**

5. **[Allegro A1126 Datasheet](https://www.allegromicro.com/~/media/Files/Datasheets/A1126-Datasheet.ashx)**

---

## 5. Dodatkowe zdjęcia

**[Kliknij tutaj, aby otworzyć folder Google Drive](https://drive.google.com/drive/folders/1yIsKV0Ez4vL3xuzYP01oauqGa7uJhQD5?usp=sharing)**

## **Bugra**
