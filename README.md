<h4 align="center">
  <a href="README.md">Türkçe</a> | <a href="README_EN.md">English</a>
</h4>

<div align="center">
  <h1>HP Victus 16 Hall Effect Sensör Arızası ve Çözümü</h1>
  <p><b>Buğra Güngöz</b><br><i>EEE</i></p>
</div>

---
<style>
  body { background-color: #0d1117 !important; color: #c9d1d9 !important; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif; line-height: 1.6; }
  h1, h2, h3, h4 { color: #58a6ff !important; border-bottom: 1px solid #21262d; padding-bottom: 0.3em; }
  a { color: #58a6ff !important; text-decoration: none; font-weight: bold; }
  a:hover { text-decoration: underline; }
  img { max-width: 100% !important; max-height: 450px !important; height: auto !important; object-fit: contain !important; display: block; margin: 20px auto; border-radius: 8px; border: 1px solid #30363d; }
</style>

**Kullanım:** Atıfta bulunulduğu sürece alıntı yapılabilir; ticari kullanılamaz, sensör fiyatının 100 katı onarım ücreti isteyenlerden uzak durun! Olası herhangi sorunuz veya görüşünüz varsa gungozb@gmail.com mail adresimden ulaşabilirsiniz, onarım istekleri için mail atmayın!

**UYARI:** *Bu dokümantasyonda yer alan donanım modifikasyonları için SMD seviyesinde lehimleme becerisi, şematik okuma yetkinliği ve elektriksel ölçüm bilgisi gerekmektedir. Burada sunulan bilgilerin uygulanması esnasında oluşabilecek olası donanım hasarları, veri kayıpları veya kişisel yaralanmaların sorumluluğu tamamen kişinin kendine aittir. Yapılacak her türlü fiziksel müdahale, cihazınızın üretici garantisini sonlandıracaktır. Tüm işlemler yapılırken mutlaka cihaz enerjisiz hale getirilmelidir, batarya soketi sökülmelidir, SMD eleman kılıfları küçük olduğundan ve kart üzerinde çalışılacak alan dar olduğundan diğer bileşenlere zarar vermemek adına çok dikkatli olunmalıdır.*

*HATALI YAPTIĞINIZ İŞLEMLERİN SONUÇLARINDAN DOLAYI HİÇBİR ŞEKİLDE SORUMLULUK KABUL ETMİYORUM!*

---

## 1. Giriş
Bu yazı, HP Victus 16 serisi (özellikle s0 ve r0 varyantları) dizüstü bilgisayarlarda yüksek termal yük altında daha çok gözlemlenen ani sistem kapanması, siyah ekran ve donanımsal kilitlenme, ekran gidip gelme gibi tipik belirtileri olan hall effect sensör arızasının analizini ve çözüm yöntemini içermektedir. Arızanın temel nedeni, orijinal hall effect sensörünün aslında tasarıma ısıl anlamda uyumsuz olması ve besleme hattında bulunan bir sigortanın hatalı termal tasarım sonucu maruz kaldığı ısıl bozulmadır. Orijinal sensörün neden hatalı bir tasarım kaynaklı ısıl kararsızlık yaşadığı ile ilgili detay ilerleyen bölümlerde açıklanacaktır. Sorun, EC çipinin hall effect sensör yüzünden hatalı tetiklenmesine bağlı olarak sistemin kapak kapandı zannedip klavye ve ekran aydınlatmalarını kapatması şeklinde gerçekleşiyor. Termal stres yüzünden kararsız çalışan sensör devresi, EC'yi sürekli hatalı tetiklediği için ekranda ve klavye aydınlatmasında rastgele zaman aralıkları ile açılma/kapanma, titreme gibi sonuçlar oluyor.

Bu dokümantasyon boyunca faydalanılan kaynaklara doküman sonunda kaynakçadan ulaşılabilir. Verilen kaynaklarda iki temel çözüm yönteminden bahsedilmiş olup, bu dokümantasyonda ise her iki çözüm yönteminin de birlikte uygulanması üzerinde durulacak ve neden her ikisinin de gerekli olduğu ilerleyen bölümlerde detaylandırılacaktır. Bu dokümantasyonda anlatılacakları bizzat kendi bilgisayarımda uyguladım, tamir işleminden çok uzun süre geçmedi ancak artık herhangi bir sorunum yok. Termal stres testleri ile uzun süreler bilgisayarı zorladım, her şey normal şekilde çalışıyor; problemin çözüldüğünü söyleyebilirim.

---

## 2. Tespit
Eğer kullanıcının klavye aydınlatması kapalı durumda ise bunu açık vaziyete getirmesi, bu sorunun daha iyi gözlemlenmesine ve sadece ekrandan kaynaklı bir sorun olmadığını fark etmesine yardımcı olacaktır. Yazılımsal olarak bir çözümü maalesef mevcut değil. DDU ile hem dahili hem harici ekran kartı sürücelerini temizledim ve sıfırdan kurulum yaptım, BIOS güncellemesi yaptım ve bunlar dışında zaten daha üst seviye yazılımsal çözüm olacağını düşünmüyorum, boşuna format atmaya gerek yok yani. Hiçbiri işe yaramadı. Windows içerisinden güç seçeneklerinden kapak kapatılınca hiçbir şey yapma seçilse bile sorun çözülmemekte. Bütün bu denediklerime rağmen hala ekran titremesi, ekran ve klavye aydınlatmasının gidip gelmesi gibi belirtileri yaşadığım için sorunumun hall effect sensör arızası olduğuna emin oldum.

Arızanın temel sebebi termal bozulma ve ısıl kararsızlık. Ancak bu termal stres sadece hall effect sensörü etkilemiyor; hall effect sensör besleme hattı üzerindeki bir sigortayı da bozarak empedans göstermesi şeklinde termal bozulmaya uğratıyor. Orijinal sensör LA8 kodlu Toshiba TCS40DLR olup, aşağıda orijinal sensöre dair çalışma koşullarının datasheet verisi mevcut.

<img alt="Victus16 Hall Effect Sensör Arızası ve Çözümü" src="https://github.com/user-attachments/assets/eedd46d0-9ef8-4678-9d09-5715da7cb701" />

Maksimum çalışma sıcaklığı bir oyuncu laptopu için oldukça kısıtli bir seviyede. Hatta Toshiba datasheet içerisinde bu durumla ilgili bir açıklamada bulunmuş:

<img alt="2" src="https://github.com/user-attachments/assets/1dad43f2-c007-4554-bb62-81e7b429138a" />

Sonuç olarak her ne donanımsal modifikasyon yapılırsa yapılsın bu sensör bu laptop tasarımı için uygun bir seçim değil; daha yüksek sıcaklıklara dayanımı olan başka bir sensör ile değişim mutlaka gerekli olacaktır. Birazdan bahsedceğim sensörün besleme hattındaki sigorta bypass işlemi tek başına yeterli olmayacaktır, bir zaman sonrasında termal stres yüzünden orijinal sensör kararsız çalışacaktır.

---

## 3. Çözüm
Tek sorun kaynağı hall effect sensör değil, yukarıda da bahsettiğim gibi bu sensörün besleme hattındaki bir sigortanın da bozulması. Bu bozulma klasik sigorta bozulması gibi açık devreye düşerek değil; termal bozulma sonrası empedans artışı ile oluyor ve bu sebeple besleme hattında bir kararsızlığa sebep oluyor. Bu sigortanın gerçekten bozulduğunu anlamak için dilenirse omaj ölçümü (devreden sökülmeden kesin sonuç vermez lakin bu sigortaya paralel direnç göremedim, ölçüm için problar ile yeterince beklenirse yaklaşık sonuç verebilir) veya kısa devre modunda kontroller yapılabilir. Benim devre üzerindeki omaj ölçümü sonucum 260 ohm çıktı. Termal yorulmaya bağlı olarak bu değer değişebilir. Kısa devre testi ile buzzer sesi alamadım, yine 260 ohm gösterdi multimetre. Ölçüm sonuçlarıma göre sigorta kesinlikle asıl işlevini yitirmiş ve artık hat üzerinde bir empedans oluşturuyor. Lakin bu empedans, arızanın durumuna göre değişkenlik gösterecektir, yani termal stres dolayısı ile sigortanın empedansı gitgide daha da artacaktır.

Asıl sorun ise bu empedans artışı yüzünden hall effect sensör besleme hattı geriliminin çökmesidir. Kaynakçaya bakılırsa hall sensör besleme hattı için IR sensör beslemesinden yol çekilmesi gibi modifikasyonlar bu sebeple yapılmıştır, ancak bunlara gerek yok. Bu yazıda daha temiz bir çözüm olarak bu bozulmuş sigortanın bypass edilmesi anlatılacaktır. Sigorta üzerinde devrede enerji varken (burada dikkatli olunması gerekiyor, devre üzerinde hatalı prob teması kısa devreye sebep olabilir) 30mV düşüm ölçtüm; eğer sigortanın empedansı daha da yüksek olmuş olsaydı bu düşüm daha da çok olacak ve sensör besleme hattı gerilimi çökecekti. Asıl önemli olan nokta ise bu bozuk sigorta yüzünden, benim yeni sensör olarak taktığım sensörün çalışma akımı daha yüksek olduğu için hat gerilimi daha da düşecektir ve yeni sensör de kararsız çalışacaktır. Bu sebeple sensör değişimi tek başına yeterli olmayacak, besleme hattının stabil olması için sigortanın bypass edilmesi mutlaka gerekecektir.

Sigorta bypass işlemi tehlikeli bir yaklaşım olarak görülebilir ancak zaten besleme kısmındaki regülatör devreleri 3V3 hattı için kendilerinden aşırı akım korumalı. Ayrıca yeni taktığım hall effect sensör kendinden dahili kısa devre korumalı olup çekebileceği maksimum akım sınırlandırılmıştır. Bu yazıda tam bir çözüm sunulacağından diğer belirtilere ve çözümlere değinmeye gerek duymadım. Eğer bu yazıda anlatılanları uygulamak kişi için mümkün değilse, daha kolay çözüm arayışı içinde ise kaynakça kısmında verdiğim linkler detaylı incelenerek bahsedilen birkaç basit çözüm denenebilir.

Yeni hall effect sensör olarak Allegro A1126 sensörü kullandım. En kısa sürede ve kolayca erişebildiğim için komponent tercihim bu sensörden yana oldu, orijinal sensör ile alınacak sensörün datasheet verileri mukayese edilerek farklı marka model uygun bir sensör de tercih edilebilir. Allegro A1126 hall effect sensör otomotiv sınıfı komponent olup termal olarak orijinal sensörden çok daha dayanıklı, ayrıca yukarıda bahsettiğim gibi dahili kısa devre koruması gibi özellikleri mevcut (sigorta bypass işlemini tolere edilebilir kılıyor). Toshiba sensörden en belirgin farkı ise çalışma akımının 4mA olması; bu akım orijinal sensörün çektiği 1.2mA (3.3V için, çalışma anı akımı olup bu akım sürekli çekilmese de anlık peak değer bu değerde) değerinden yaklaşık 4 kat daha fazla, dolayısıyla eğer bypass edilmemiş ise bozuk sigorta üzerinde normalden 4 kat fazla gerilim düşümüne sebep olacaktır ve 3V3 besleme hattının gerilimi yeni sensörün çalışamayacağı kadar çökecektir (minimum 3V besleme gerilimi).

Sıcaklık laptop çalışırken çok daha yüksek olacaktır ancak datasheet verisi nominal şartlarda orijinal Toshiba hall effect sensör için aşağıdaki gibidir:

Toshiba sensörün 3.3V için 1.2mA gereksinimini gösteren tablo:

<img alt="3" src="https://github.com/user-attachments/assets/2728d3a7-d420-4dde-bd3e-52f6d03ddd70" />

Allegro sensöre dair datasheet verisi ise aşağıdaki gibidir:

Allegro sensöre dair minimum besleme gerilimi, akım sınırlama değerinin maksimum değeri, çalışma durumu için besleme akımını gösteren tablo:

<img alt="4" src="https://github.com/user-attachments/assets/4565e1dc-3f7f-47f6-b414-031f3b0ae486" />

Allegro sensör datasheet açıklama kısmındaki aşırı akım korumasına dair metnin yer aldığı görsel:

<img alt="5" src="https://github.com/user-attachments/assets/af264158-5024-42a5-87cf-1398ab47dae9" />

Allegro sensöre dair çalışma sıcaklığı aralığını gösteren tablo:

<img alt="6" src="https://github.com/user-attachments/assets/1a727310-dff8-43d0-9b88-8aa4e556ccbe" />

Allegro sensöre dair besleme gerilimi minimum 3V olduğu görülebilir. Bu sebeple sensörün besleme hattı mutlaka stabil olmalı, dolayısıyla bozuk olan (veya zamanla termal stres yüzünden empedansı artarak bozulacak) besleme hattındaki sigorta mutlaka bypass (yeni takılacak parçanın da sıcaklık dayanımı yüksek olmayacaksa benzer şekilde termal dejenere olacaktır) edilmelidir ki hat gerilimi asla çökmesin (0.3V pay var zaten maksimum gerilim düşümü olarak). Ayrıca sensöre dair datasheet açıklama metninde de bahsedildiği üzere 60mA akım sınırlaması olduğu görülebilir. Bu da sigortayı bypass etme işlemine rağmen sensör devresinin kendinden dahili aşırı akım korumalı olacağını gösteriyor. Allegro sensöre dair çalışma sıcaklığı ise görüleceği üzere orijinal sensörün maksimum değerinin neredeyse iki katı.

Orijinal sensör ile yeni sensörün pinleri birebir uyumludur yani eskisi çıkarılıp yenisi doğrudan takılabilir, her iki sensör de SOT-23 kılıfındadır.

Toshiba sensöre dair pinout gösterimi:

<img alt="7" src="https://github.com/user-attachments/assets/78919efa-1adc-40e4-9c5b-60211b4ee484" />

Allegro sensöre dair pinout gösterimi:

<img alt="8" src="https://github.com/user-attachments/assets/b57c2697-5b96-42e7-849d-b27661cbcc0e" />

Sensörün olduğu karta erişmek için HP bakım kılavuzunda yer alan adımlar takip edilebilir:

Anakartı sökebilmek için ilk önce sökülmesi gereken tüm kabloları gösteren görsel:

<img alt="99" src="https://github.com/user-attachments/assets/bfaacb83-548e-4ca1-b132-b8ab5a3ff457" />

Anakartın sökümünü gösteren görsel:

<img alt="999" src="https://github.com/user-attachments/assets/4f52088a-cd33-4b4f-aa14-c7c042a5c140" />

Hall sensörün bulunduğu kartın sökümünü gösteren görsel:

<img alt="9" src="https://github.com/user-attachments/assets/6237f31e-8dce-45ea-9878-38d4f6b2ae4d" />

Görüleceği üzere hall effect sensörün bulunduğu karta erişmek için tüm anakartın yerinden sökülmesi gerekmekte. Buraya kadarki tüm işlem adımları için HP bakım ve servis rehberi dokümanı incelenmelidir. Kaynakça kısmında rehbere dair link mevcut.

Hall sensör kartı (IR sensör tarafı) görseli:

<img alt="IMG-20260411-WA0013" src="https://github.com/user-attachments/assets/22240520-363c-4405-bb39-cab0ff47f7e1" />

Hall sensör kartı (Hall sensör tarafı) görseli:

<img alt="IMG-20260411-WA0020" src="https://github.com/user-attachments/assets/0b367bbf-e471-4a2d-8a5c-6cf2ab95c79f" />

Sensör kartına dair görüntüler yukarıda incelenebilir, daha net haline aşağıda verdiğim linklerden ulaşılabilir.

Hall sensör kartı (Hall sensör tarafı) yakın çekim görseli:

<img alt="20260516_232333" src="https://github.com/user-attachments/assets/7465b064-9eb6-45aa-98ec-f5dcc1c6e522" />

Toshiba sensör sıcak hava tabancası veya kalem havya ile yerinden çıkarılıp, Allegro sensör doğrudan takılabilir:

Hall sensör kartı (Hall sensör tarafı) A1126 ile değişmiş halini gösteren görsel:

<img alt="20260516_235849" src="https://github.com/user-attachments/assets/3c141737-f8c9-4d9d-97e5-86d09733c698" />

Görüldüğü üzere sensöre yakın iki adet kapasitör mevcut, kılıfları çok küçük olduğu için yanlışlıkla yerinden çıkması halinde tekrar lehimlemesi zor olacaktır. Ayrıca sıcak hava kullanılacak ise JIR2 soket ısıdan eriyebilir veya bozulabilir. Bu sebeple işlem öncesi sensörün etrafı ve hasar görmesi muhtemel soket üzerini kapton bantla kapatılmalıdır. Hatta yeni sensörün sıcaktan daha az etkilenmesi ve fiziksel mukavemet olması açısından değişim sonrasında sensörün üzerine birkaç kat kapton bant uygulanabilir, fazla uygulanırsa sensör kartına baskı oluşacaktır o yüzden bir iki kat yeter. Sensör kartı üzerindeki işlem bu kadar.

Bahsedilen sigorta üzerinde işlem yapabilmek için sensör kartı yerine takılmalı, anakart tekrardan yerine montajlanmalı ve ardından bakır soğutma boruları sökülmelidir. Bakır borular sökmeden de sensör görülebiliyor ve gerekli omaj, süreklilik, voltaj ölçümleri yapılabilir fakat üzerinde işlem yapmak için soğutucuların sökülmesi şart. Soğutucu vidaları söküldükten sonra dikkatle 90 derece kaldırılmalı ve termal putty kurumadıysa asla ellenmemelidir (kurumuş ise değişmesi gerekmekte). Soğutma bloğu yerinden kaldırıldığı için ise termal macun yenilenmesi şart olmakta, bakır borular yerine montajlanırken vidalar tork sırasına göre sıkılmalı. 

Sigorta; hall ve IR sensörün bulunduğu kartın anakarta bağlandığı JIR1 isimli soketin hemen yanında FU6 isminde bulunuyor.

FU6 sigortayı gösteren yakın görsel:

<img alt="20260410_214919(6)" src="https://github.com/user-attachments/assets/79d82752-efc3-4f26-b131-cfec5d1c2114" />

FU6 sigortayı gösteren uzak görsel:

<img alt="20260410_235137(2)" src="https://github.com/user-attachments/assets/30dde8d7-a056-44ac-bcf5-48bd6083d47e" />

FU6 sigortayı çok yakından gösteren görsel:

<img alt="IMG-20260521-WA0007" src="https://github.com/user-attachments/assets/d0c24470-7b7c-405b-a397-3424e1f06495" />

Orijinal sigortaya dair bir veri bulamadım, yerine uygun kılıfta 100-200 mA civarı özellikli sigorta takılabilir diye düşünüyorum veya uygun kılıfta 0 ohm direnç de kullanılabilir belki. Lakin termal stres dolayısıyla bunların mantıklı olduğunu düşünmüyorum, o sebeple ben sigortayı söküp yerine lehim köprüsü ile bypass işlemi yaptım.

FU6 sigortanın sökülmüş halini yakından gösteren görsel:

<img alt="20260517_010511" src="https://github.com/user-attachments/assets/3182a871-0657-4c5b-b8e4-51107a93122b" />

Parçayı yerinden söktükten sonra, lehim köprüsü ile FU6 sigortasını bypass ettim ve multimetre ile kontrol ettiğimde (enerji varken dikkatli olunmalı) 3.3V hattının sorunsuz olarak soket üzerindeki pine ulaştığını gördüm.

FU6 sigortanın lehim köprüsüyle bypass edilmiş halini gösteren görsel:

<img alt="image" src="https://github.com/user-attachments/assets/4c2260ed-0f74-4f58-9619-de3497ee7953" />

Bu kontrol kartta enerji yokken sigortanın sokete yakın pini ile soketin pinleri denenerek hangi pinde 3V3 görülmesi gerektiği belirlenerek de yapılmalı. Tüm lehim işlemlerinden sonra süreklilik testi ile lehimlerin sağlamlığı da mutlaka kontrol edilmeli.

---

## 4. Kaynakça

1. **[Reddit: HP Victus 16 Hall Effect Sensor Megathread](https://www.reddit.com/r/HPVictus/comments/1pzcl91/victus_16_hall_effect_sensor_megathread_laptop/?solution=3f3e10398e7623863f3e10398e762386&js_challenge=1&token=bbbe4bf1c9a2b5160829c4be34da58612efd3615a145ca5a7c9f0026c8098d69&jsc_orig_r=)**
   Yazar: [RaguTom](https://www.reddit.com/user/RaguTom/)

2. **[BADCAPS: HP Victus 16 Hall Effect Sensor Problem](https://www.badcaps.net/forum/troubleshooting-hardware-devices-and-electronics-theory/troubleshooting-laptops-tablets-and-mobile-devices/3822460-hp-victus-16-hall-effect-sensor-problem)**
   Yazar: [mitchw](https://www.badcaps.net/member/199143-mitchw)

3. **[Maintenance and Service Guide Victus by HP 16.1 inch](https://kaas.hpcloud.hp.com/pdf-public/pdf_7911438_en-US-1.pdf)**

4. **[Toshiba TCS40DLR Datasheet](https://toshiba.semicon-storage.com/info/TCS40DLR_datasheet_en_20150403.pdf?did=30105&prodName=TCS40DLR)**

5. **[Allegro A1126 Datasheet](https://www.ozdisan.com/api/pdf/product/assets/A1126-Allegro.pdf)**

---

## 5. Ek görseller

**[Google Drive Klasörü İçin Tıklayın](https://drive.google.com/drive/folders/1yIsKV0Ez4vL3xuzYP01oauqGa7uJhQD5?usp=sharing)**

## **Bugra**
