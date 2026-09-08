function berechneErweitertenBMI() {
    var geschlecht = document.getElementById('geschlecht').value;
    var alter = parseInt(document.getElementById('alter').value);
    var cm = parseFloat(document.getElementById('groesse').value);
    var kg = parseFloat(document.getElementById('gewicht').value);
    
    if (!alter || !cm || !kg || alter <= 0 || cm <= 0 || kg <= 0) {
        document.getElementById('ergebnis').innerText = "Bitte geben Sie für alle Felder gültige Werte ein.";
        return;
    }
    
    var m = cm / 100;
    var bmi = kg / (m * m);
    var bmiGerundet = bmi.toFixed(1);
    
    // Standard-Klassifizierung nach DGE / NRC für Erwachsene ab 19 Jahren
    var minNormal = 19;
    var maxNormal = 24;
    
    // Geschlechtsspezifische Anpassung
    if (geschlecht === 'm') {
        minNormal += 1;
        maxNormal += 1;
    }
    
    // Altersspezifische Verschiebung der Grenzen (NRC-Empfehlungen)
    if (alter >= 25 && alter <= 34) {
        minNormal += 0; maxNormal += 0;
    } else if (alter >= 35 && alter <= 44) {
        minNormal += 1; maxNormal += 1;
    } else if (alter >= 45 && alter <= 54) {
        minNormal += 2; maxNormal += 2;
    } else if (alter >= 55 && alter <= 64) { // Korrektur: Logikfehler im Original behoben (war 45 bis 64)
        minNormal += 3; maxNormal += 3;
    } else if (alter > 64) {
        minNormal += 4; maxNormal += 4;
    }
    
    var interpretation = "";
    if (bmi < minNormal) {
        interpretation = "Untergewicht";
    } else if (bmi <= maxNormal) {
        interpretation = "Normalgewicht";
    } else if (bmi <= maxNormal + 5) {
        interpretation = "Übergewicht";
    } else {
        interpretation = "Starkes Übergewicht (Adipositas)";
    }
    
    var ausgabe = "Ihr BMI: " + bmiGerundet + "\n";
    ausgabe += "Einstufung: " + interpretation + "\n";
    ausgabe += "(Ihr optimaler Normalgewicht-Bereich liegt bei diesem Alter bei einem BMI von " + minNormal + " bis " + maxNormal + ".)";
    
    document.getElementById('ergebnis').innerText = ausgabe;
}

// Event-Listener an den Button hängen, sobald das Skript geladen ist
document.getElementById('berechnenBtn').addEventListener('click', berechneErweitertenBMI);