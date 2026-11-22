---
layout: default
title: HP Victus 16 Hall Effect Sensör Arızası ve Çözümü (FU6) - Türkçe Rehber
permalink: /tr-guide/
lang: tr
description: HP Victus 16 laptoplarda hall effect sensör (Toshiba TCS40DLR, LA8) ve FU6 sigorta arızasının teşhisi ve Allegro A1126 ile donanımsal çözümü.
---
<div align="center">
  <h1>HP Victus 16 Hall Effect Sensör Arızası ve Çözümü</h1>
  <p><b>Buğra Güngöz</b><br><i>EEE</i></p>
</div>

**Kullanım:** Atıfta bulunulduğu sürece alıntı yapılabilir; ticari kullanılamaz, sensör fiyatının 100 katı onarım ücreti isteyenlerden uzak durun! Olası herhangi sorunuz veya görüşünüz varsa gungozb@gmail.com mail adresimden ulaşabilirsiniz, onarım istekleri için mail atmayın!

**UYARI:** *Bu dokümantasyonda yer alan donanım modifikasyonları için SMD seviyesinde lehimleme becerisi, şematik okuma yetkinliği ve elektriksel ölçüm bilgisi gerekmektedir. Burada sunulan bilgilerin uygulanması esnasında oluşabilecek olası donanım hasarları, veri kayıpları veya kişisel yaralanmaların sorumluluğu tamamen kişinin kendine aittir. Yapılacak her türlü fiziksel müdahale, cihazınızın üretici garantisini sonlandıracaktır. Tüm işlemler yapılırken mutlaka cihaz enerjisiz hale getirilmelidir, batarya soketi sökülmelidir, SMD eleman kılıfları küçük olduğundan ve kart üzerinde çalışılacak alan dar olduğundan diğer bileşenlere zarar vermemek adına çok dikkatli olunmalıdır. Rehberde bahsedilen enerjili gerilim ölçümleri bunun tek istisnasıdır ve ilgili adımlarda belirtilen önlemlerle yapılmalıdır.*

*HATALI YAPTIĞINIZ İŞLEMLERİN SONUÇLARINDAN DOLAYI HİÇBİR ŞEKİLDE SORUMLULUK KABUL ETMİYORUM!*

---

<!-- slot:intro -->

## 1. Giriş
Bu yazı, HP Victus 16 serisi (özellikle s0 ve r0 varyantları) dizüstü bilgisayarlarda yüksek termal yük altında daha çok gözlemlenen ani sistem kapanması, siyah ekran ve donanımsal kilitlenme, ekran gidip gelme gibi tipik belirtileri olan hall effect sensör arızasının analizini ve çözüm yöntemini içermektedir. Arızanın temel nedeni, orijinal hall effect sensörünün aslında tasarıma ısıl anlamda uyumsuz olması ve besleme hattında bulunan bir sigortanın hatalı termal tasarım sonucu maruz kaldığı ısıl bozulmadır. Orijinal sensörün neden hatalı bir tasarım kaynaklı ısıl kararsızlık yaşadığı ile ilgili detay ilerleyen bölümlerde açıklanacaktır. Sorun, EC çipinin hall effect sensör yüzünden hatalı tetiklenmesine bağlı olarak sistemin kapak kapandı zannedip klavye ve ekran aydınlatmalarını kapatması şeklinde gerçekleşiyor. Termal stres yüzünden kararsız çalışan sensör devresi, EC'yi sürekli hatalı tetiklediği için ekranda ve klavye aydınlatmasında rastgele zaman aralıkları ile açılma/kapanma, titreme gibi sonuçlar oluyor.

Bu dokümantasyon boyunca faydalanılan kaynaklara doküman sonunda kaynakçadan ulaşılabilir. Verilen kaynaklarda iki temel çözüm yönteminden bahsedilmiş olup, bu dokümantasyonda ise her iki çözüm yönteminin de birlikte uygulanması üzerinde durulacak ve neden her ikisinin de gerekli olduğu ilerleyen bölümlerde detaylandırılacaktır. Bu dokümantasyonda anlatılacakları bizzat kendi bilgisayarımda uyguladım, tamir işleminden çok uzun süre geçmedi ancak artık herhangi bir sorunum yok. Termal stres testleri ile uzun süreler bilgisayarı zorladım, her şey normal şekilde çalışıyor; problemin çözüldüğünü söyleyebilirim.

---

## 2. Tespit
Eğer kullanıcının klavye aydınlatması kapalı durumda ise bunu açık vaziyete getirmesi, bu sorunun daha iyi gözlemlenmesine ve sadece ekrandan kaynaklı bir sorun olmadığını fark etmesine yardımcı olacaktır. Yazılımsal olarak bir çözümü maalesef mevcut değil. DDU ile hem dahili hem harici ekran kartı sürücülerinini temizledim ve sıfırdan kurulum yaptım, BIOS güncellemesi yaptım ve bunlar dışında zaten daha üst seviye yazılımsal çözüm olacağını düşünmüyorum, boşuna format atmaya gerek yok yani. Hiçbiri işe yaramadı. Windows içerisinden güç seçeneklerinden kapak kapatılınca hiçbir şey yapma seçilse bile sorun çözülmemekte. Bütün bu denediklerime rağmen hala ekran titremesi, ekran ve klavye aydınlatmasının gidip gelmesi gibi belirtileri yaşadığım için sorunumun hall effect sensör arızası olduğuna emin oldum.

Arızanın temel sebebi termal bozulma ve ısıl kararsızlık. Ancak bu termal stres sadece hall effect sensörü etkilemiyor; hall effect sensör besleme hattı üzerindeki bir sigortayı da bozarak empedans göstermesi şeklinde termal bozulmaya uğratıyor. Orijinal sensör LA8 kodlu Toshiba TCS40DLR olup, aşağıda orijinal sensöre dair çalışma koşullarının datasheet verisi mevcut.

<img alt="Toshiba TCS40DLR çalışma koşulları tablosu" src="https://github.com/user-attachments/assets/eedd46d0-9ef8-4678-9d09-5715da7cb701" loading="lazy" />

Maksimum çalışma sıcaklığı bir oyuncu laptopu için oldukça kısıtlı bir seviyede. Hatta Toshiba datasheet içerisinde bu durumla ilgili bir açıklamada bulunmuş:

<img alt="Toshiba datasheet güvenilirlik notu" src="https://github.com/user-attachments/assets/1dad43f2-c007-4554-bb62-81e7b429138a" loading="lazy" />

Sonuç olarak her ne donanımsal modifikasyon yapılırsa yapılsın bu sensör bu laptop tasarımı için uygun bir seçim değil; daha yüksek sıcaklıklara dayanımı olan başka bir sensör ile değişim mutlaka gerekli olacaktır. Birazdan bahsedeceğim sensörün besleme hattındaki sigorta bypass işlemi tek başına yeterli olmayacaktır, bir zaman sonrasında termal stres yüzünden orijinal sensör kararsız çalışacaktır.

---

## 3. Çözüm
Tek sorun kaynağı hall effect sensör değil, yukarıda da bahsettiğim gibi bu sensörün besleme hattındaki bir sigortanın da bozulması. Bu bozulma klasik sigorta bozulması gibi açık devreye düşerek değil; termal bozulma sonrası empedans artışı ile oluyor ve bu sebeple besleme hattında bir kararsızlığa sebep oluyor. Bu sigortanın gerçekten bozulduğunu anlamak için dilenirse omaj ölçümü (devreden sökülmeden kesin sonuç vermez lakin bu sigortaya paralel direnç göremedim, ölçüm için problar ile yeterince beklenirse yaklaşık sonuç verebilir) veya kısa devre modunda kontroller yapılabilir. Benim devre üzerindeki omaj ölçümü sonucum 260 ohm çıktı. Termal yorulmaya bağlı olarak bu değer değişebilir. Kısa devre testi ile buzzer sesi alamadım, yine 260 ohm gösterdi multimetre. Ölçüm sonuçlarıma göre sigorta kesinlikle asıl işlevini yitirmiş ve artık hat üzerinde bir empedans oluşturuyor. Lakin bu empedans, arızanın durumuna göre değişkenlik gösterecektir, yani termal stres dolayısı ile sigortanın empedansı gitgide daha da artacaktır.

<!-- slot:diagram -->


Asıl sorun ise bu empedans artışı yüzünden hall effect sensör besleme hattı geriliminin çökmesidir. Kaynakçaya bakılırsa hall sensör besleme hattı için IR sensör beslemesinden yol çekilmesi gibi modifikasyonlar bu sebeple yapılmıştır, ancak bunlara gerek yok. Bu yazıda daha temiz bir çözüm olarak bu bozulmuş sigortanın bypass edilmesi anlatılacaktır. Sigorta üzerinde devrede enerji varken (burada dikkatli olunması gerekiyor, devre üzerinde hatalı prob teması kısa devreye sebep olabilir) 30mV düşüm ölçtüm; eğer sigortanın empedansı daha da yüksek olmuş olsaydı bu düşüm daha da çok olacak ve sensör besleme hattı gerilimi çökecekti. Asıl önemli olan nokta ise bu bozuk sigorta yüzünden, benim yeni sensör olarak taktığım sensörün çalışma akımı daha yüksek olduğu için hat gerilimi daha da düşecektir ve yeni sensör de kararsız çalışacaktır. Bu sebeple sensör değişimi tek başına yeterli olmayacak, besleme hattının stabil olması için sigortanın bypass edilmesi mutlaka gerekecektir.

Sigorta bypass işlemi tehlikeli bir yaklaşım olarak görülebilir. Bu sigortanın görevi sensör kartında veya kartı anakarta bağlayan FFC kabloda bir kısa devre olması durumunda 3V3 hattını korumak, yani sensör kartında fiziksel bir hasar (ezilmiş kablo, lehim köprüsü, sıvı teması gibi) olmadıkça devreye girmesi gereken bir koruma değil. Böyle bir durumda da besleme kısmındaki regülatör devreleri 3V3 hattı için kendinden aşırı akım korumalı olduğundan koruma yine sağlanacaktır. Lakin regülatörün koruma eşiği amper mertebesinde olduğu için bu eşiğin altında kalan kısmi bir kısa devrede kablo ve ince yollar ısınabilir; bu riski tamamen sıfırlamak isteyen kişi bypass yerine uygun değerde yeni bir sigorta tercih edebilir. Ayrıca belirtmek gerekir ki Allegro sensörün datasheet'inde bahsedilen kısa devre koruması sensörün çıkış pinine ait, besleme hattını değil çıkış transistörünü koruyor; yani bypass işleminin güvenliği bu korumaya değil regülatörün korumasına dayanıyor. Bu yazıda tam bir çözüm sunulacağından diğer belirtilere ve çözümlere değinmeye gerek duymadım. Eğer bu yazıda anlatılanları uygulamak kişi için mümkün değilse, daha kolay çözüm arayışı içinde ise kaynakça kısmında verdiğim linkler detaylı incelenerek bahsedilen birkaç basit çözüm denenebilir.

Yeni hall effect sensör olarak Allegro A1126 sensörü kullandım. En kısa sürede ve kolayca erişebildiğim için komponent tercihim bu sensörden yana oldu, orijinal sensör ile alınacak sensörün datasheet verileri mukayese edilerek farklı marka model uygun bir sensör de tercih edilebilir. Allegro A1126 hall effect sensör otomotiv sınıfı komponent olup termal olarak orijinal sensörden çok daha dayanıklı, ayrıca yukarıda bahsettiğim gibi kısa devre korumalı çıkış gibi özellikleri mevcut. Toshiba sensörden en belirgin farkı ise akımı çekiş şekli. Toshiba sensör akımı sürekli çekmiyor, datasheet'te de belirtildiği üzere dahili devresi akımı periyodik darbeler halinde çekiyor; 3.3V için verilen 1.2mA değeri bu darbelerin tepe değeri, ortalama akım bunun çok altında. Benim ölçümlerim de bunu doğruluyor: orijinal sensör takılıyken sigorta üzerinde 30mV düşüm ve sigorta için 260 ohm ölçtüm, buradan ortalama akım 30mV / 260Ω ≈ 115µA çıkıyor (1.2mA sürekli çekilseydi düşüm 312mV olurdu). Allegro sensör ise chopper stabilize bir sensör olup akımı sürekli çekiyor ve datasheet'te maksimum besleme akımı 4mA olarak verilmiş. Aynı bozuk sigorta ile en kötü durumda sigorta üzerinde 4mA × 260Ω ≈ 1.04V düşüm olacak, yani sensöre yaklaşık 2.26V ulaşacak ki bu minimum 3V besleme geriliminin oldukça altında. Tersinden bakarsak 3.3V ile 3V arasındaki 0.3V'luk pay, 260 ohm'luk sigorta ile ancak 0.3V / 260Ω ≈ 1.15mA akıma kadar yetiyor; datasheet sensörün bu akımın altında kalacağını garanti etmiyor, sigortanın direnci termal stres ile arttıkça da bu sınır daha da düşecek (orijinal sensör 2.3V'a kadar çalışabildiği için bozuk sigortayı bir süre tolere edebiliyordu, Allegro'da bu pay yok). Dolayısıyla sigorta bypass edilmeden yeni sensör kararlı çalışamayacaktır.


Sıcaklık laptop çalışırken çok daha yüksek olacaktır ancak datasheet verisi nominal şartlarda orijinal Toshiba hall effect sensör için aşağıdaki gibidir:

Toshiba sensörün 3.3V için 1.2mA gereksinimini gösteren tablo:

<img alt="Toshiba TCS40DLR akım tüketimi tablosu" src="https://github.com/user-attachments/assets/2728d3a7-d420-4dde-bd3e-52f6d03ddd70" loading="lazy" />

Allegro sensöre dair datasheet verisi ise aşağıdaki gibidir:

Allegro sensöre dair minimum besleme gerilimi, akım sınırlama değerinin maksimum değeri, çalışma durumu için besleme akımını gösteren tablo:

<img alt="Allegro A1126 elektriksel karakteristikler tablosu" src="https://github.com/user-attachments/assets/4565e1dc-3f7f-47f6-b414-031f3b0ae486" loading="lazy" />

Allegro sensör datasheet açıklama kısmındaki aşırı akım korumasına dair metnin yer aldığı görsel:

<img alt="Allegro A1126 datasheet açıklama metni" src="https://github.com/user-attachments/assets/af264158-5024-42a5-87cf-1398ab47dae9" loading="lazy" />

Allegro sensöre dair çalışma sıcaklığı aralığını gösteren tablo:

<img alt="Allegro A1126 çalışma sıcaklığı aralığı" src="https://github.com/user-attachments/assets/1a727310-dff8-43d0-9b88-8aa4e556ccbe" loading="lazy" />

Allegro sensöre dair besleme gerilimi minimum 3V olduğu görülebilir. Bu sebeple sensörün besleme hattı mutlaka stabil olmalı, dolayısıyla bozuk olan (veya zamanla termal stres yüzünden empedansı artarak bozulacak) besleme hattındaki sigorta mutlaka bypass (yeni takılacak parçanın da sıcaklık dayanımı yüksek olmayacaksa benzer şekilde termal dejenere olacaktır) edilmelidir ki hat gerilimi asla çökmesin (0.3V pay var zaten maksimum gerilim düşümü olarak). Ayrıca sensöre dair datasheet açıklama metninde de bahsedildiği üzere 60mA akım sınırlaması olduğu görülebilir. Bu sınır sensörün çıkış akımına aittir, yani EC'ye giden çıkış hattında bir kısa devre olursa sensörün çıkışı kendini koruyacaktır. Allegro sensörün çalışma sıcaklığı üst sınırı ise görüleceği üzere 150°C, yani orijinal sensörün 85°C olan üst sınırından 65°C daha yüksek.

Orijinal sensör ile yeni sensörün pinleri birebir uyumludur yani eskisi çıkarılıp yenisi doğrudan takılabilir; Toshiba sensör SOT-23F, Allegro sensör ise SOT-23W kılıfında olup iki kılıf birbiriyle uyumludur.

Toshiba sensöre dair pinout gösterimi:

<img alt="Toshiba TCS40DLR pinout" src="https://github.com/user-attachments/assets/78919efa-1adc-40e4-9c5b-60211b4ee484" loading="lazy" />

Allegro sensöre dair pinout gösterimi:

<img alt="Allegro A1126 pinout" src="https://github.com/user-attachments/assets/b57c2697-5b96-42e7-849d-b27661cbcc0e" loading="lazy" />

Sensörün olduğu karta erişmek için HP bakım kılavuzunda yer alan adımlar takip edilebilir:

Anakartı sökebilmek için ilk önce sökülmesi gereken tüm kabloları gösteren görsel:

<img alt="Anakart sökümü öncesi çıkarılacak kablolar" src="https://github.com/user-attachments/assets/bfaacb83-548e-4ca1-b132-b8ab5a3ff457" loading="lazy" />

Anakartın sökümünü gösteren görsel:

<img alt="Anakartın sökümü" src="https://github.com/user-attachments/assets/4f52088a-cd33-4b4f-aa14-c7c042a5c140" loading="lazy" />

Hall sensörün bulunduğu kartın sökümünü gösteren görsel:

<img alt="Hall sensör kartının sökümü" src="https://github.com/user-attachments/assets/6237f31e-8dce-45ea-9878-38d4f6b2ae4d" loading="lazy" />

Görüleceği üzere hall effect sensörün bulunduğu karta erişmek için tüm anakartın yerinden sökülmesi gerekmekte. Buraya kadarki tüm işlem adımları için HP bakım ve servis rehberi dokümanı incelenmelidir. Kaynakça kısmında rehbere dair link mevcut.

Hall sensör kartı (IR sensör tarafı) görseli:

<img alt="Hall sensör kartı, IR sensör tarafı" src="https://github.com/user-attachments/assets/22240520-363c-4405-bb39-cab0ff47f7e1" loading="lazy" />

Hall sensör kartı (Hall sensör tarafı) görseli:

<img alt="Hall sensör kartı, Hall sensör tarafı" src="https://github.com/user-attachments/assets/0b367bbf-e471-4a2d-8a5c-6cf2ab95c79f" loading="lazy" />

Sensör kartına dair görüntüler yukarıda incelenebilir, daha net haline aşağıda verdiğim linklerden ulaşılabilir.

Hall sensör kartı (Hall sensör tarafı) yakın çekim görseli:

<img alt="Hall sensör kartı yakın çekim" src="https://github.com/user-attachments/assets/7465b064-9eb6-45aa-98ec-f5dcc1c6e522" loading="lazy" />

Toshiba sensör sıcak hava tabancası veya kalem havya ile yerinden çıkarılıp, Allegro sensör doğrudan takılabilir:

Hall sensör kartı (Hall sensör tarafı) A1126 ile değişmiş halini gösteren görsel:

<img alt="A1126 takılmış Hall sensör kartı" src="https://github.com/user-attachments/assets/3c141737-f8c9-4d9d-97e5-86d09733c698" loading="lazy" />

Görüldüğü üzere sensöre yakın iki adet kapasitör mevcut, kılıfları çok küçük olduğu için yanlışlıkla yerinden çıkması halinde tekrar lehimlemesi zor olacaktır. Ayrıca sıcak hava kullanılacak ise JIR2 soket ısıdan eriyebilir veya bozulabilir. Bu sebeple işlem öncesi sensörün etrafı ve hasar görmesi muhtemel soket üzerini kapton bantla kapatılmalıdır. Değişim sonrasında sensörün üzerine fiziksel mukavemet açısından bir iki kat kapton bant uygulanabilir. Ekstra bir önlem olarak kapton bant katmanlarının arasına teflon bant koyularak ince bir yalıtım bloğu da oluşturulabilir; ben denedim, bu blok ısıyı bir yüzünden diğer yüzüne neredeyse hiç iletmiyor. Lakin bu blok sensöre üst taraftan gelen ısıyı azaltır, kart üzerindeki bakır yollar ve pinler üzerinden gelen ısıyı engelleyemez. Allegro sensörün sıcaklık dayanımı zaten yeterince yüksek olduğundan onun için şart değil; orijinal sensörü kullanmaya devam edecekler için veya FU6 yerine takılacak yeni sigorta ya da 0 ohm direnç için basit bir ek koruma olarak düşünülebilir (FU6 üzerine uygulanacaksa soğutucunun oturmasına engel olmamasına dikkat edilmeli). Blok mutlaka ince tutulmalı, kalın olursa sensör kartı ile anakart arasında şişkinlik yapıp karta baskı oluşturuyor. Sensör kartı üzerindeki işlem bu kadar.

Bahsedilen sigorta üzerinde işlem yapabilmek için sensör kartı yerine takılmalı, anakart tekrardan yerine montajlanmalı ve ardından bakır soğutma boruları sökülmelidir. Bakır borular sökmeden de sensör görülebiliyor ve gerekli omaj, süreklilik, voltaj ölçümleri yapılabilir fakat üzerinde işlem yapmak için soğutucuların sökülmesi şart. Soğutucu vidaları söküldükten sonra dikkatle 90 derece kaldırılmalı ve termal putty kurumadıysa asla ellenmemelidir (kurumuş ise değişmesi gerekmekte). Soğutma bloğu yerinden kaldırıldığı için ise termal macun yenilenmesi şart olmakta, bakır borular yerine montajlanırken vidalar tork sırasına göre sıkılmalı. 

Sigorta; hall ve IR sensörün bulunduğu kartın anakarta bağlandığı JIR1 isimli soketin hemen yanında FU6 isminde bulunuyor.

<!-- slot:variant -->


FU6 sigortayı gösteren yakın görsel:

<img alt="FU6 sigorta yakın görünüm" src="https://github.com/user-attachments/assets/79d82752-efc3-4f26-b131-cfec5d1c2114" loading="lazy" />

FU6 sigortayı gösteren uzak görsel:

<img alt="FU6 sigortanın soğutucuya göre konumu" src="https://github.com/user-attachments/assets/30dde8d7-a056-44ac-bcf5-48bd6083d47e" loading="lazy" />

FU6 sigortayı çok yakından gösteren görsel:

<img alt="FU6 sigorta çok yakın görünüm" src="https://github.com/user-attachments/assets/d0c24470-7b7c-405b-a397-3424e1f06495" loading="lazy" />

Orijinal sigortaya dair bir veri bulamadım, yerine uygun kılıfta 100-200 mA civarı özellikli sigorta takılabilir diye düşünüyorum veya uygun kılıfta 0 ohm direnç de kullanılabilir belki. Lakin termal stres dolayısıyla bunların mantıklı olduğunu düşünmüyorum, o sebeple ben sigortayı söküp yerine lehim köprüsü ile bypass işlemi yaptım.

FU6 sigortanın sökülmüş halini yakından gösteren görsel:

<img alt="FU6 sökülmüş pedler" src="https://github.com/user-attachments/assets/3182a871-0657-4c5b-b8e4-51107a93122b" loading="lazy" />

Parçayı yerinden söktükten sonra, lehim köprüsü ile FU6 sigortasını bypass ettim ve multimetre ile kontrol ettiğimde (enerji varken dikkatli olunmalı) 3.3V hattının sorunsuz olarak soket üzerindeki pine ulaştığını gördüm.

FU6 sigortanın lehim köprüsüyle bypass edilmiş halini gösteren görsel:

<img alt="FU6 lehim köprüsü ile bypass edilmiş" src="https://github.com/user-attachments/assets/4c2260ed-0f74-4f58-9619-de3497ee7953" loading="lazy" />

Bu kontrol kartta enerji yokken sigortanın sokete yakın pini ile soketin pinleri denenerek hangi pinde 3V3 görülmesi gerektiği belirlenerek de yapılmalı. Tüm lehim işlemlerinden sonra süreklilik testi ile lehimlerin sağlamlığı da mutlaka kontrol edilmeli.

<!-- slot:checklist -->


---

## 4. Kaynakça

1. **[Reddit: HP Victus 16 Hall Effect Sensor Megathread](https://www.reddit.com/r/HPVictus/comments/1pzcl91/victus_16_hall_effect_sensor_megathread_laptop/)**
   Yazar: [RaguTom](https://www.reddit.com/user/RaguTom/)

2. **[BADCAPS: HP Victus 16 Hall Effect Sensor Problem](https://www.badcaps.net/forum/troubleshooting-hardware-devices-and-electronics-theory/troubleshooting-laptops-tablets-and-mobile-devices/3822460-hp-victus-16-hall-effect-sensor-problem)**
   Yazar: [mitchw](https://www.badcaps.net/member/199143-mitchw)

3. **[Maintenance and Service Guide Victus by HP 16.1 inch](https://kaas.hpcloud.hp.com/pdf-public/pdf_7911438_en-US-1.pdf)**

4. **[Toshiba TCS40DLR Datasheet](https://toshiba.semicon-storage.com/info/TCS40DLR_datasheet_en_20150403.pdf?did=30105&prodName=TCS40DLR)**

5. **[Allegro A1126 Datasheet](https://www.allegromicro.com/~/media/Files/Datasheets/A1126-Datasheet.ashx)**

---

## 5. Ek görseller

**[Google Drive Klasörü İçin Tıklayın](https://drive.google.com/drive/folders/1yIsKV0Ez4vL3xuzYP01oauqGa7uJhQD5?usp=sharing)**

## **Bugra**
