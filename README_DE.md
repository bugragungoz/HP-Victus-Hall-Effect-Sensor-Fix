---
layout: default
title: HP Victus 16 Hall-Sensor-Defekt und Lösung (FU6) - Deutsche Anleitung
permalink: /de-guide/
lang: de
description: Diagnose und Reparatur des Hall-Sensors (Toshiba TCS40DLR, LA8) und der Sicherung FU6 beim HP Victus 16, mit einem Allegro A1126 als Ersatz.
---
<div align="center">
  <h1>HP Victus 16: Defekt des Hall-Sensors und Lösung</h1>
  <p><b>Buğra Güngöz</b><br><i>EEE</i></p>
</div>

**Nutzung:** Darf mit Quellenangabe zitiert werden; eine kommerzielle Nutzung ist nicht gestattet. Bei Fragen oder Anmerkungen erreichen Sie mich unter gungozb@gmail.com.

**WARNUNG:** *Die Hardware-Modifikationen in dieser Dokumentation erfordern Lötkenntnisse auf SMD-Niveau, die Fähigkeit, Schaltpläne zu lesen, sowie Wissen über elektrische Messungen. Die Verantwortung für mögliche Hardwareschäden, Datenverluste oder Verletzungen, die bei der Anwendung der hier dargestellten Informationen entstehen, liegt vollständig bei der jeweiligen Person. Jeder physische Eingriff führt zum Verlust der Herstellergarantie. Bei allen Arbeiten muss das Gerät unbedingt stromlos sein und der Akkustecker muss abgezogen werden. Da die SMD-Bauteile sehr klein sind und der Arbeitsbereich auf der Platine eng ist, ist äußerste Vorsicht geboten, um andere Bauteile nicht zu beschädigen. Die in dieser Anleitung erwähnten Spannungsmessungen unter Spannung sind die einzige Ausnahme und müssen mit den bei den jeweiligen Schritten genannten Vorsichtsmaßnahmen durchgeführt werden.*

*FÜR DIE FOLGEN FEHLERHAFT DURCHGEFÜHRTER ARBEITEN ÜBERNEHME ICH KEINERLEI VERANTWORTUNG!*

*Diese Fassung ist eine Übersetzung. Maßgeblich ist die [englische Originalfassung]({{ '/en-guide/' | relative_url }}).*

---

<!-- slot:intro -->

## 1. Einleitung
Dieser Artikel behandelt die Analyse und die Lösung des Hall-Sensor-Defekts, der sich bei Laptops der Serie HP Victus 16 (insbesondere den Varianten s0 und r0) vor allem unter hoher thermischer Last mit typischen Symptomen wie plötzlichem Abschalten, schwarzem Bildschirm, Hängern und flackerndem Bildschirm zeigt. Die eigentliche Ursache des Defekts ist, dass der originale Hall-Sensor thermisch nicht zum Design passt und dass eine Sicherung in der Versorgungsleitung aufgrund eines fehlerhaften thermischen Designs durch Hitze degradiert. Warum der originale Sensor wegen dieses fehlerhaften Designs thermisch instabil wird, wird in den folgenden Abschnitten erklärt. Das Problem entsteht dadurch, dass der EC-Chip wegen des Hall-Sensors fälschlich ausgelöst wird: Das System nimmt an, dass der Deckel geschlossen ist, und schaltet Tastatur- und Bildschirmbeleuchtung ab. Da die unter thermischem Stress instabil arbeitende Sensorschaltung den EC ständig fehlerhaft auslöst, gehen Bildschirm- und Tastaturbeleuchtung in zufälligen Abständen an und aus oder flackern.

Die in dieser Dokumentation verwendeten Quellen finden Sie im Literaturverzeichnis am Ende. In den Quellen werden zwei grundlegende Lösungswege beschrieben; diese Dokumentation konzentriert sich darauf, beide gemeinsam anzuwenden, und erklärt in den folgenden Abschnitten, warum beide notwendig sind. Ich habe die hier beschriebenen Schritte selbst an meinem eigenen Computer durchgeführt; die Reparatur ist noch nicht sehr lange her, aber ich habe keinerlei Probleme mehr. Ich habe den Computer lange mit thermischen Belastungstests beansprucht, alles funktioniert normal; ich kann sagen, dass das Problem gelöst ist.

---

## 2. Diagnose
Wenn die Tastaturbeleuchtung ausgeschaltet ist, hilft es, sie einzuschalten: So lässt sich das Problem besser beobachten und man erkennt, dass es nicht nur den Bildschirm betrifft. Eine Softwarelösung gibt es leider nicht. Ich habe mit DDU sowohl den integrierten als auch den dedizierten Grafiktreiber vollständig entfernt und neu installiert und das BIOS aktualisiert; eine weitergehende Softwarelösung halte ich ohnehin nicht für möglich, eine Neuinstallation des Betriebssystems ist also Zeitverschwendung. Nichts davon hat geholfen. Das Problem bleibt auch dann bestehen, wenn in den Windows-Energieoptionen beim Schließen des Deckels „Nichts unternehmen“ ausgewählt ist. Da ich trotz all dieser Versuche weiterhin Symptome wie Bildschirmflackern und an- und ausgehende Bildschirm- und Tastaturbeleuchtung hatte, war ich mir sicher, dass es sich um einen Defekt des Hall-Sensors handelt.

Die Hauptursache des Defekts sind thermische Degradation und thermische Instabilität. Dieser thermische Stress betrifft jedoch nicht nur den Hall-Sensor; er schädigt auch eine Sicherung in der Versorgungsleitung des Hall-Sensors, die dadurch degradiert und einen erhöhten Widerstand aufweist. Der originale Sensor ist ein Toshiba TCS40DLR mit der Markierung LA8; unten finden Sie die Datenblattangaben zu seinen Betriebsbedingungen.

<img alt="Betriebsbedingungen des Toshiba TCS40DLR" src="https://github.com/user-attachments/assets/eedd46d0-9ef8-4678-9d09-5715da7cb701" loading="lazy" />

Die maximale Betriebstemperatur ist für einen Gaming-Laptop sehr knapp bemessen. Toshiba hat im Datenblatt sogar einen Hinweis zu diesem Thema angebracht:

<img alt="Zuverlässigkeitshinweis im Toshiba-Datenblatt" src="https://github.com/user-attachments/assets/1dad43f2-c007-4554-bb62-81e7b429138a" loading="lazy" />

Unabhängig davon, welche Hardware-Modifikation vorgenommen wird, ist dieser Sensor für dieses Laptop-Design also keine geeignete Wahl; ein Austausch gegen einen Sensor mit höherer Temperaturfestigkeit ist unbedingt notwendig. Die Überbrückung der Sicherung in der Versorgungsleitung, auf die ich gleich eingehe, reicht allein nicht aus; nach einiger Zeit wird der originale Sensor wegen des thermischen Stresses wieder instabil arbeiten.

---

## 3. Lösung
Der Hall-Sensor ist nicht die einzige Fehlerquelle; wie oben erwähnt, ist auch der Defekt einer Sicherung in seiner Versorgungsleitung eine Ursache. Dieser Defekt äußert sich nicht wie bei einer klassischen Sicherung als Unterbrechung, sondern als Widerstandsanstieg nach thermischer Degradation und führt dadurch zu einer instabilen Versorgungsleitung. Um festzustellen, ob die Sicherung wirklich defekt ist, kann man eine Widerstandsmessung durchführen (ohne Auslöten ist das Ergebnis nicht eindeutig, aber ich konnte keinen parallelen Widerstand zu dieser Sicherung erkennen; wenn man die Messspitzen lange genug hält, erhält man einen ungefähren Wert) oder eine Prüfung im Durchgangsmodus. Meine Messung in der Schaltung ergab 260 Ohm. Dieser Wert kann je nach thermischer Ermüdung schwanken. Bei der Durchgangsprüfung gab es keinen Signalton, das Multimeter zeigte wieder 260 Ohm. Nach meinen Messergebnissen hat die Sicherung ihre eigentliche Funktion eindeutig verloren und wirkt nun als Widerstand in der Leitung. Dieser Widerstand hängt allerdings vom Zustand des Defekts ab, das heißt, er wird durch den thermischen Stress immer weiter zunehmen.

<!-- slot:diagram -->

Das eigentliche Problem ist, dass die Spannung in der Versorgungsleitung des Hall-Sensors durch diesen Widerstandsanstieg einbricht. In den Quellen wurden aus diesem Grund Modifikationen durchgeführt, etwa eine Leitung von der Versorgung des IR-Sensors zur Versorgung des Hall-Sensors zu ziehen, doch das ist nicht nötig. In diesem Artikel wird als sauberere Lösung die Überbrückung der degradierten Sicherung beschrieben. Bei eingeschalteter Schaltung habe ich an der Sicherung einen Spannungsabfall von 30 mV gemessen (hier ist Vorsicht geboten, ein falscher Kontakt der Messspitzen kann einen Kurzschluss verursachen); wäre der Widerstand der Sicherung noch höher gewesen, wäre dieser Abfall noch größer und die Versorgungsspannung des Sensors würde einbrechen. Der wichtigste Punkt ist jedoch, dass wegen dieser defekten Sicherung die Leitungsspannung noch weiter sinkt, weil der Betriebsstrom des von mir eingesetzten Allegro-Sensors höher ist, und auch der neue Sensor instabil arbeiten würde. Ein reiner Sensortausch reicht daher nicht aus; damit die Versorgungsleitung stabil ist, muss die Sicherung unbedingt überbrückt werden.

Das Überbrücken einer Sicherung kann als gefährlicher Ansatz erscheinen. Aufgabe dieser Sicherung ist es, die 3V3-Leitung zu schützen, falls auf der Sensorplatine oder am FFC-Kabel, das sie mit der Hauptplatine verbindet, ein Kurzschluss auftritt; sie ist also ein Schutz, der ohne physische Beschädigung der Sensorplatine (gequetschtes Kabel, Lötbrücke, Flüssigkeitskontakt usw.) nie ansprechen sollte. Selbst in einem solchen Fall bleibt der Schutz bestehen, da die Spannungsregler im Versorgungsteil für die 3V3-Leitung einen eigenen Überstromschutz haben. Da die Schutzschwelle des Reglers jedoch im Amperebereich liegt, kann ein teilweiser Kurzschluss unterhalb dieser Schwelle das Kabel und dünne Leiterbahnen erwärmen; wer dieses Risiko vollständig ausschließen möchte, kann statt der Überbrückung eine neue Sicherung mit passendem Nennwert einsetzen. Außerdem ist zu beachten, dass der im Datenblatt des Allegro-Sensors erwähnte Kurzschlussschutz zum Ausgangspin des Sensors gehört: Er schützt den Ausgangstransistor und nicht die Versorgungsleitung. Die Sicherheit der Überbrückung beruht also auf dem Schutz des Reglers und nicht auf diesem Schutz. Da dieser Artikel eine vollständige Lösung bietet, gehe ich nicht auf weitere Symptome und alternative Lösungen ein. Wer die hier beschriebenen Schritte nicht umsetzen kann und eine einfachere Lösung sucht, kann nach gründlicher Durchsicht der Links im Literaturverzeichnis einige der dort genannten einfachen Lösungen ausprobieren.

Als neuen Hall-Sensor habe ich den Allegro A1126 verwendet. Ich habe mich für dieses Bauteil entschieden, weil ich es schnell und einfach beschaffen konnte; durch einen Vergleich der Datenblätter des originalen und des infrage kommenden Sensors kann auch ein passender Sensor einer anderen Marke oder eines anderen Modells gewählt werden. Der Allegro A1126 ist ein Bauteil für den Automobilbereich und thermisch deutlich robuster als der originale Sensor. Wie oben erwähnt, hat er außerdem Eigenschaften wie einen kurzschlussfesten Ausgang. Der auffälligste Unterschied zum Toshiba-Sensor ist die Art, wie er Strom aufnimmt. Der Toshiba-Sensor nimmt keinen dauerhaften Strom auf; wie im Datenblatt angegeben, nimmt seine interne Schaltung den Strom in periodischen Impulsen auf. Der für 3,3 V angegebene Wert von 1,2 mA ist der Spitzenwert dieser Impulse, der Mittelwert liegt weit darunter. Meine Messungen bestätigen das: Mit eingebautem Originalsensor habe ich an der Sicherung einen Spannungsabfall von 30 mV und für die Sicherung 260 Ohm gemessen; daraus ergibt sich ein mittlerer Strom von 30 mV / 260 Ω ≈ 115 µA (würden 1,2 mA dauerhaft fließen, läge der Abfall bei 312 mV). Der Allegro-Sensor ist dagegen ein chopperstabilisierter Sensor mit dauerhafter Stromaufnahme; sein Datenblatt nennt einen maximalen Versorgungsstrom von 4 mA. Mit derselben defekten Sicherung fallen im ungünstigsten Fall 4 mA × 260 Ω ≈ 1,04 V an der Sicherung ab, am Sensor kommen also nur etwa 2,26 V an, deutlich unter seiner minimalen Versorgungsspannung von 3 V. Umgekehrt betrachtet reicht die Reserve von 0,3 V zwischen 3,3 V und 3 V mit einer 260-Ohm-Sicherung nur bis zu einem Strom von 0,3 V / 260 Ω ≈ 1,15 mA; das Datenblatt garantiert nicht, dass der Sensor unter diesem Strom bleibt, und da der Widerstand der Sicherung durch thermischen Stress steigt, sinkt diese Grenze noch weiter (der originale Sensor konnte die defekte Sicherung eine Zeit lang tolerieren, weil er bis 2,3 V arbeitet; der Allegro-Sensor hat diese Reserve nicht). Ohne Überbrückung der Sicherung kann der neue Sensor daher nicht stabil arbeiten.

Im Betrieb unter Last ist die Temperatur deutlich höher, die Datenblattangaben für den originalen Toshiba-Hall-Sensor unter Nennbedingungen lauten jedoch wie folgt:

Tabelle mit dem Bedarf von 1,2 mA bei 3,3 V für den Toshiba-Sensor:

<img alt="Stromaufnahme des Toshiba TCS40DLR" src="https://github.com/user-attachments/assets/2728d3a7-d420-4dde-bd3e-52f6d03ddd70" loading="lazy" />

Die Datenblattangaben für den Allegro-Sensor lauten wie folgt:

Tabelle mit minimaler Versorgungsspannung, Maximalwert der Strombegrenzung und Versorgungsstrom im Betrieb für den Allegro-Sensor:

<img alt="Elektrische Kennwerte des Allegro A1126" src="https://github.com/user-attachments/assets/4565e1dc-3f7f-47f6-b414-031f3b0ae486" loading="lazy" />

Ausschnitt aus der Beschreibung im Datenblatt des Allegro-Sensors mit dem Text zum Überstromschutz:

<img alt="Beschreibungstext im Datenblatt des Allegro A1126" src="https://github.com/user-attachments/assets/af264158-5024-42a5-87cf-1398ab47dae9" loading="lazy" />

Tabelle mit dem Betriebstemperaturbereich des Allegro-Sensors:

<img alt="Betriebstemperaturbereich des Allegro A1126" src="https://github.com/user-attachments/assets/1a727310-dff8-43d0-9b88-8aa4e556ccbe" loading="lazy" />

Wie man sieht, beträgt die minimale Versorgungsspannung des Allegro-Sensors 3 V. Die Versorgungsleitung des Sensors muss daher unbedingt stabil sein; die defekte Sicherung (oder eine, die durch thermischen Stress mit der Zeit zwangsläufig degradieren wird) muss deshalb auf jeden Fall überbrückt werden (ein neu eingesetztes Bauteil ohne hohe Temperaturfestigkeit würde ebenso thermisch degradieren), damit die Leitungsspannung niemals einbricht (für den maximalen Spannungsabfall gibt es ohnehin nur eine Reserve von 0,3 V). Außerdem ist, wie in der Beschreibung im Datenblatt erwähnt, eine Strombegrenzung von 60 mA vorhanden. Diese Grenze bezieht sich auf den Ausgangsstrom des Sensors: Tritt auf der Ausgangsleitung zum EC ein Kurzschluss auf, schützt sich der Ausgang des Sensors selbst. Wie man sieht, liegt die obere Betriebstemperaturgrenze des Allegro-Sensors bei 150 °C und damit 65 °C über der oberen Grenze des originalen Sensors von 85 °C.

Die Pins des originalen und des neuen Sensors sind vollständig kompatibel, der alte Sensor kann also ausgelötet und der neue direkt an seiner Stelle eingelötet werden; der Toshiba-Sensor steckt in einem SOT-23F-Gehäuse, der Allegro-Sensor in einem SOT-23W-Gehäuse, und die beiden Gehäuse sind zueinander kompatibel.

Pinbelegung des Toshiba-Sensors:

<img alt="Pinbelegung Toshiba TCS40DLR" src="https://github.com/user-attachments/assets/78919efa-1adc-40e4-9c5b-60211b4ee484" loading="lazy" />

Pinbelegung des Allegro-Sensors:

<img alt="Pinbelegung Allegro A1126" src="https://github.com/user-attachments/assets/b57c2697-5b96-42e7-849d-b27661cbcc0e" loading="lazy" />

Um an die Platine mit dem Sensor zu gelangen, kann man den Schritten im HP-Wartungshandbuch folgen:

Abbildung aller Kabel, die zuerst gelöst werden müssen, um die Hauptplatine ausbauen zu können:

<img alt="Vor dem Ausbau der Hauptplatine zu lösende Kabel" src="https://github.com/user-attachments/assets/bfaacb83-548e-4ca1-b132-b8ab5a3ff457" loading="lazy" />

Ausbau der Hauptplatine:

<img alt="Ausbau der Hauptplatine" src="https://github.com/user-attachments/assets/4f52088a-cd33-4b4f-aa14-c7c042a5c140" loading="lazy" />

Ausbau der Platine, auf der sich der Hall-Sensor befindet:

<img alt="Ausbau der Hall-Sensorplatine" src="https://github.com/user-attachments/assets/6237f31e-8dce-45ea-9878-38d4f6b2ae4d" loading="lazy" />

Wie man sieht, muss die gesamte Hauptplatine ausgebaut werden, um an die Platine mit dem Hall-Sensor zu gelangen. Für alle Schritte bis hierhin sollte das HP-Wartungs- und Servicehandbuch sorgfältig gelesen werden. Der Link dazu steht im Literaturverzeichnis.

Hall-Sensorplatine (Seite mit dem IR-Sensor):

<img alt="Hall-Sensorplatine, Seite mit IR-Sensor" src="https://github.com/user-attachments/assets/22240520-363c-4405-bb39-cab0ff47f7e1" loading="lazy" />

Hall-Sensorplatine (Seite mit dem Hall-Sensor):

<img alt="Hall-Sensorplatine, Seite mit Hall-Sensor" src="https://github.com/user-attachments/assets/0b367bbf-e471-4a2d-8a5c-6cf2ab95c79f" loading="lazy" />

Die Aufnahmen der Sensorplatine sind oben zu sehen; höher aufgelöste Versionen finden Sie über die unten angegebenen Links.

Nahaufnahme der Hall-Sensorplatine (Seite mit dem Hall-Sensor):

<img alt="Nahaufnahme der Hall-Sensorplatine" src="https://github.com/user-attachments/assets/7465b064-9eb6-45aa-98ec-f5dcc1c6e522" loading="lazy" />

Der Toshiba-Sensor kann mit einer Heißluftstation oder einem Lötkolben entfernt und der Allegro-Sensor direkt eingesetzt werden:

Hall-Sensorplatine (Seite mit dem Hall-Sensor) nach dem Austausch gegen den A1126:

<img alt="Hall-Sensorplatine mit eingebautem A1126" src="https://github.com/user-attachments/assets/3c141737-f8c9-4d9d-97e5-86d09733c698" loading="lazy" />

Wie man sieht, befinden sich zwei Kondensatoren direkt neben dem Sensor; da ihre Gehäuse sehr klein sind, lassen sie sich nur schwer wieder einlöten, falls sie sich versehentlich lösen. Wird mit Heißluft gearbeitet, kann außerdem die Buchse JIR2 durch die Hitze schmelzen oder beschädigt werden. Deshalb sollten die Umgebung des Sensors und die gefährdete Buchse vor der Arbeit mit Kapton-Band abgedeckt werden. Nach dem Austausch können zur mechanischen Verstärkung ein oder zwei Lagen Kapton-Band auf den Sensor geklebt werden. Als zusätzliche Maßnahme lässt sich auch ein dünner Isolierblock bauen, indem man Teflonband zwischen die Kapton-Lagen legt; ich habe das ausprobiert, der Block leitet Wärme von einer Seite zur anderen fast gar nicht. Dieser Block verringert jedoch nur die Wärme, die von oben auf den Sensor trifft; die Wärme, die über die Kupferbahnen und Pins der Platine kommt, kann er nicht aufhalten. Da die Temperaturfestigkeit des Allegro-Sensors ohnehin hoch genug ist, ist das für ihn nicht notwendig; es kann als einfacher Zusatzschutz für alle dienen, die den originalen Sensor weiter verwenden, oder für die neue Sicherung bzw. den 0-Ohm-Widerstand anstelle von FU6 (wird er über FU6 angebracht, darauf achten, dass er den korrekten Sitz des Kühlkörpers nicht behindert). Der Block muss unbedingt dünn bleiben; ist er zu dick, wölbt er sich zwischen Sensorplatine und Hauptplatine und übt Druck auf die Platine aus. Damit sind die Arbeiten an der Sensorplatine abgeschlossen.

Um an der erwähnten Sicherung zu arbeiten, muss die Sensorplatine wieder eingesetzt, die Hauptplatine wieder montiert und anschließend müssen die Kupfer-Heatpipes demontiert werden. Die Stelle ist auch ohne Ausbau der Heatpipes zu sehen, und die nötigen Widerstands-, Durchgangs- und Spannungsmessungen sind möglich, doch um an ihr zu arbeiten, muss der Kühlkörper ausgebaut werden. Nach dem Lösen der Schrauben den Kühlkörper vorsichtig senkrecht abheben; der Wärmeleitkitt sollte, wenn er noch weich ist, nicht angefasst werden (ist er trocken und brüchig, muss er ersetzt werden). Da der Kühlblock abgenommen wurde, muss die Wärmeleitpaste zwingend erneuert werden, und beim Wiedereinbau der Kupfer-Heatpipes müssen die Schrauben in der vorgegebenen Reihenfolge angezogen werden.

Die Sicherung trägt die Bezeichnung FU6 und befindet sich direkt neben der Buchse JIR1, über die die Platine mit Hall- und IR-Sensor mit der Hauptplatine verbunden ist.

<!-- slot:variant -->

Nahaufnahme der Sicherung FU6:

<img alt="Nahaufnahme der Sicherung FU6" src="https://github.com/user-attachments/assets/79d82752-efc3-4f26-b131-cfec5d1c2114" loading="lazy" />

Weitwinkelaufnahme der Sicherung FU6:

<img alt="Position von FU6 relativ zum Kühlkörper" src="https://github.com/user-attachments/assets/30dde8d7-a056-44ac-bcf5-48bd6083d47e" loading="lazy" />

Sehr nahe Aufnahme der Sicherung FU6:

<img alt="Sehr nahe Aufnahme der Sicherung FU6" src="https://github.com/user-attachments/assets/d0c24470-7b7c-405b-a397-3424e1f06495" loading="lazy" />

Zur originalen Sicherung habe ich keine genauen Daten gefunden; ich nehme an, dass eine Ersatzsicherung mit etwa 100 bis 200 mA in passender Bauform oder vielleicht ein 0-Ohm-Widerstand in passender Bauform eingesetzt werden könnte. Wegen des anhaltenden thermischen Stresses halte ich einen Austausch jedoch nicht für eine sinnvolle Dauerlösung; deshalb habe ich die Sicherung vollständig ausgelötet und mit einer Lötbrücke überbrückt.

Nahaufnahme der Pads nach dem Auslöten von FU6:

<img alt="Pads nach dem Auslöten von FU6" src="https://github.com/user-attachments/assets/3182a871-0657-4c5b-b8e4-51107a93122b" loading="lazy" />

Nach dem Auslöten des Bauteils habe ich FU6 mit einer Lötbrücke überbrückt und mit dem Multimeter geprüft (bei eingeschalteter Platine ist äußerste Vorsicht geboten), dass die 3,3-V-Leitung einwandfrei am Pin der Buchse ankommt.

Sicherung FU6 mit Lötbrücke überbrückt:

<img alt="FU6 mit Lötbrücke überbrückt" src="https://github.com/user-attachments/assets/4c2260ed-0f74-4f58-9619-de3497ee7953" loading="lazy" />

Diese Prüfung sollte auch bei stromloser Platine erfolgen: Per Durchgangsprüfung zwischen dem zur Buchse näheren Pad der Sicherung und den Pins der Buchse lässt sich genau bestimmen, welcher Pin 3V3 führen muss. Nach allen Lötarbeiten muss die Festigkeit der Lötstellen unbedingt per Durchgangsprüfung kontrolliert werden.

<!-- slot:checklist -->

---

## 4. Quellen

1. **[Reddit: HP Victus 16 Hall Effect Sensor Megathread](https://www.reddit.com/r/HPVictus/comments/1pzcl91/victus_16_hall_effect_sensor_megathread_laptop/)**
   Autor: [RaguTom](https://www.reddit.com/user/RaguTom/)

2. **[BADCAPS: HP Victus 16 Hall Effect Sensor Problem](https://www.badcaps.net/forum/troubleshooting-hardware-devices-and-electronics-theory/troubleshooting-laptops-tablets-and-mobile-devices/3822460-hp-victus-16-hall-effect-sensor-problem)**
   Autor: [mitchw](https://www.badcaps.net/member/199143-mitchw)

3. **[Maintenance and Service Guide Victus by HP 16.1 inch](https://kaas.hpcloud.hp.com/pdf-public/pdf_7911438_en-US-1.pdf)**

4. **[Toshiba TCS40DLR Datasheet](https://toshiba.semicon-storage.com/info/TCS40DLR_datasheet_en_20150403.pdf?did=30105&prodName=TCS40DLR)**

5. **[Allegro A1126 Datasheet](https://www.allegromicro.com/~/media/Files/Datasheets/A1126-Datasheet.ashx)**

---

## 5. Weitere Bilder

**[Hier klicken für den Google-Drive-Ordner](https://drive.google.com/drive/folders/1yIsKV0Ez4vL3xuzYP01oauqGa7uJhQD5?usp=sharing)**

## **Bugra**
