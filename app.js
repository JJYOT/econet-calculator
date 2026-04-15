document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const resultContainer = document.getElementById('result-container');
    const tuloResult = document.getElementById('tulo-result');
    const tuloBar = document.getElementById('tulo-bar');
    const poistoCard = document.getElementById('poisto-card');
    const poistoResult = document.getElementById('poisto-result');
    const poistoBar = document.getElementById('poisto-bar');

    const useLiquidCheckbox = document.getElementById('use-liquid');
    const liquidInputs = document.getElementById('liquid-inputs');
    const gt40Input = document.getElementById('gt40');
    const gt41Input = document.getElementById('gt41');
    const gt42Input = document.getElementById('gt42');

    // Translations
    const translations = {
        fi: {
            "title": "ECONET",
            "subtitle": "Lämpötilahyötysuhteen laskin",
            "ulko": "Ulkoilman lämpötila (°C)",
            "tulo": "Tuloilman lämpötila LTO jälkeen (°C)",
            "poisto": "Poistoilman lämpötila (°C)",
            "flowtulo": "Tuloilmavirta",
            "flowpoisto": "Poistoilmavirta",
            "opt1": "Valinn.",
            "opt2": "Valinn.",
            "opt3": "Valinnainen",
            "liquid-q": "Lisätäänkö järjestelmään ulkoista energiaa?",
            "gt40": "Nestelämpötila tuloilmapatteri meno TE40 (°C)",
            "gt41": "Nestelämpötila tuloilmapatteri paluu TE41 (°C)",
            "gt42": "Nestelämpötila poistoilmapatteri paluu TE42 (°C)",
            "jate": "Jäteilman lämpötila (°C)",
            "submit": "Laske Hyötysuhde",
            "res1": "Tuloilman hyötysuhde",
            "res2": "Poistoilman hyötysuhde",
            "opt4": "Valinn.",
            "opt5": "Valinn.",
            "liquid_flow": "Nestevirta",
            "eg_pct": "EG pitoisuus",
            "tulo_patteri_otsikko": "Tuloilmapatterin tehot",
            "poisto_patteri_otsikko": "Poistoilmapatterin tehot",
            "res_ilma": "Ilmapuoli",
            "res_neste": "Nestepuoli",
            "ulkoinen_teho_otsikko": "Ulkoisen energian teho",
            "target_name": "Kohteen / Projektin nimi",
            "history_title": "Tallennushistoria",
            "btn_save": "Tallenna",
            "btn_email": "Sähköposti",
            "clear_history": "Tyhjennä historia",
            "export_csv": "Lataa CSV",
            "saved_alert": "Tallennettu historiaan!",
            "btn_pdf": "Lataa PDF",
            "target_prefix": "Kohde",
            "calc_results": "Laskennan tulokset"
        },
        en: {
            "title": "ECONET",
            "subtitle": "Temperature Efficiency Calculator",
            "ulko": "Outdoor air temperature (°C)",
            "tulo": "Supply air temperature after heat recovery (°C)",
            "poisto": "Extract air temperature (°C)",
            "flowtulo": "Supply flow",
            "flowpoisto": "Extract flow",
            "opt1": "Opt.",
            "opt2": "Opt.",
            "opt3": "Optional",
            "liquid-q": "Is external energy added to the system?",
            "gt40": "Liquid temp supply coil flow GT40 (°C)",
            "gt41": "Liquid temp supply coil return GT41 (°C)",
            "gt42": "Liquid temp extract coil return GT42 (°C)",
            "jate": "Exhaust air temperature (°C)",
            "submit": "Calculate Efficiency",
            "res1": "Supply air efficiency",
            "res2": "Extract air efficiency",
            "opt4": "Opt.",
            "opt5": "Optional",
            "liquid_flow": "Liquid flow",
            "eg_pct": "EG concentration",
            "tulo_patteri_otsikko": "Supply coil powers",
            "poisto_patteri_otsikko": "Extract coil powers",
            "res_ilma": "Air side",
            "res_neste": "Liquid side",
            "ulkoinen_teho_otsikko": "External energy power",
            "target_name": "Target / Project name",
            "history_title": "Save History",
            "btn_save": "Save",
            "btn_email": "Email",
            "clear_history": "Clear History",
            "export_csv": "Download CSV",
            "saved_alert": "Saved to history!",
            "btn_pdf": "Download PDF",
            "target_prefix": "Target",
            "calc_results": "Calculation results"
        },
        sv: {
            "title": "ECONET",
            "subtitle": "Temperaturverkningsgrad kalkylator",
            "ulko": "Utetemperatur (°C)",
            "tulo": "Tilluftstemperatur efter återvinning (°C)",
            "poisto": "Frånluftstemperatur (°C)",
            "flowtulo": "Tilluftsflöde",
            "flowpoisto": "Frånluftsflöde",
            "opt1": "Friv.",
            "opt2": "Friv.",
            "opt3": "Frivillig",
            "liquid-q": "Tillsätts extern energi i systemet?",
            "gt40": "Vätsketemp. tilluftsbatteri fram GT40 (°C)",
            "gt41": "Vätsketemp. tilluftsbatteri retur GT41 (°C)",
            "gt42": "Vätsketemp. frånluftsbatteri retur GT42 (°C)",
            "jate": "Avluftstemperatur (°C)",
            "submit": "Beräkna Verkningsgrad",
            "res1": "Tilluftens verkningsgrad",
            "res2": "Frånluftens verkningsgrad",
            "opt4": "Friv.",
            "opt5": "Friv.",
            "liquid_flow": "Vätskeflöde",
            "eg_pct": "EG-koncentration",
            "tulo_patteri_otsikko": "Tilluftsbatteriets effekter",
            "poisto_patteri_otsikko": "Frånluftsbatteriets effekter",
            "res_ilma": "Luftsida",
            "res_neste": "Vätskesida",
            "ulkoinen_teho_otsikko": "Extern energieffekt",
            "target_name": "Objektets / Projektets namn",
            "history_title": "Sparhistorik",
            "btn_save": "Spara",
            "btn_email": "E-post",
            "clear_history": "Rensa historik",
            "export_csv": "Ladda ner CSV",
            "saved_alert": "Sparades i historiken!",
            "btn_pdf": "Ladda ned PDF",
            "target_prefix": "Objekt",
            "calc_results": "Beräkningsresultat"
        }
    };

    // Language switching logic
    document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-btn[data-lang]').forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');

            const lang = target.getAttribute('data-lang');
            const data = translations[lang];

            document.getElementById('t-title').innerText = data.title;
            document.getElementById('t-subtitle').innerText = data.subtitle;
            document.getElementById('t-ulko').innerText = data.ulko;
            document.getElementById('t-tulo').innerText = data.tulo;
            document.getElementById('t-poisto').innerText = data.poisto;
            document.getElementById('t-flowtulo').innerText = data.flowtulo;
            document.getElementById('t-flowpoisto').innerText = data.flowpoisto;
            document.getElementById('t-opt1').innerText = data.opt1;
            document.getElementById('t-opt2').innerText = data.opt2;
            document.getElementById('t-opt3').innerText = data.opt3;
            document.getElementById('t-liquid-q').innerText = data["liquid-q"];
            document.getElementById('t-gt40').innerText = data.gt40;
            document.getElementById('t-gt41').innerText = data.gt41;
            document.getElementById('t-gt42').innerText = data.gt42;
            document.getElementById('t-jate').innerText = data.jate;
            document.getElementById('t-submit').innerText = data.submit;
            document.getElementById('t-res1').innerText = data.res1;
            document.getElementById('t-res2').innerText = data.res2;
            document.getElementById('t-opt4').innerText = data.opt4;
            document.getElementById('t-opt5').innerText = data.opt5;
            document.getElementById('t-liquid-flow').innerText = data.liquid_flow;
            document.getElementById('t-eg-pct').innerText = data.eg_pct;
            if (document.getElementById('t-tulo-patteri-otsikko')) document.getElementById('t-tulo-patteri-otsikko').innerText = data.tulo_patteri_otsikko;
            if (document.getElementById('t-poisto-patteri-otsikko')) document.getElementById('t-poisto-patteri-otsikko').innerText = data.poisto_patteri_otsikko;
            if (document.getElementById('t-res-tulo-ilma-teho')) document.getElementById('t-res-tulo-ilma-teho').innerText = data.res_ilma;
            if (document.getElementById('t-res-tulo-neste-teho')) document.getElementById('t-res-tulo-neste-teho').innerText = data.res_neste;
            if (document.getElementById('t-res-poisto-ilma-teho')) document.getElementById('t-res-poisto-ilma-teho').innerText = data.res_ilma;
            if (document.getElementById('t-res-poisto-neste-teho')) document.getElementById('t-res-poisto-neste-teho').innerText = data.res_neste;
            if (document.getElementById('t-ulkoinen-teho-otsikko')) document.getElementById('t-ulkoinen-teho-otsikko').innerText = data.ulkoinen_teho_otsikko;
            if (document.getElementById('target-name')) document.getElementById('target-name').placeholder = data.target_name;
            document.getElementById('t-history-title').innerText = data.history_title;
            document.getElementById('t-btn-save').innerText = data.btn_save;
            document.getElementById('t-btn-email').innerText = data.btn_email;
            if (document.getElementById('t-btn-pdf')) document.getElementById('t-btn-pdf').innerText = data.btn_pdf;
            document.getElementById('t-clear-history').innerText = data.clear_history;
            document.getElementById('t-export-csv').innerText = data.export_csv;

            // Update rendered diagram labels if it exists
            const renderedDiagram = document.getElementById('rendered-diagram');
            if (renderedDiagram) {
                const labels = {
                    fi: { j: 'Jäte', p: 'Poisto', t: 'Tulo', u: 'Ulko', pump: 'Lisäteho', meno: 'Meno', paluu: 'Paluu' },
                    en: { j: 'Exhaust', p: 'Extract', t: 'Supply', u: 'Outdoor', pump: 'Ext. Power', meno: 'Supply', paluu: 'Return' },
                    sv: { j: 'Avluft', p: 'Frånluft', t: 'Tilluft', u: 'Uteluft', pump: 'Extern Effekt', meno: 'Fram', paluu: 'Retur' }
                };
                const lbls = labels[lang] || labels.fi;
                if (renderedDiagram.querySelector('.t-jate-lbl')) renderedDiagram.querySelector('.t-jate-lbl').innerText = lbls.j + ' (GT21)';
                if (renderedDiagram.querySelector('.t-poisto-lbl')) renderedDiagram.querySelector('.t-poisto-lbl').innerText = lbls.p + ' (GT20)';
                if (renderedDiagram.querySelector('.t-tulo-lbl')) renderedDiagram.querySelector('.t-tulo-lbl').innerText = lbls.t + ' (GT10)';
                if (renderedDiagram.querySelector('.t-ulko-lbl')) renderedDiagram.querySelector('.t-ulko-lbl').innerText = lbls.u + ' (GT00)';
                if (renderedDiagram.querySelector('.t-lisateho-lbl')) renderedDiagram.querySelector('.t-lisateho-lbl').innerText = lbls.pump;
                if (renderedDiagram.querySelector('.t-gt42-lbl')) renderedDiagram.querySelector('.t-gt42-lbl').innerText = 'GT42 (' + lbls.paluu + ')';
                if (renderedDiagram.querySelector('.t-gt40-lbl')) renderedDiagram.querySelector('.t-gt40-lbl').innerText = 'GT40 (' + lbls.meno + ')';
                if (renderedDiagram.querySelector('.t-gt41-lbl')) renderedDiagram.querySelector('.t-gt41-lbl').innerText = 'GT41 (' + lbls.paluu + ')';
                if (renderedDiagram.querySelector('.t-diagram-res1')) renderedDiagram.querySelector('.t-diagram-res1').innerText = data.res1;
                if (renderedDiagram.querySelector('.t-diagram-res2')) renderedDiagram.querySelector('.t-diagram-res2').innerText = data.res2;
            }
        });
    });

    // Toggle liquid inputs visibility
    useLiquidCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            liquidInputs.classList.add('expanded');
            gt40Input.required = true;
            gt41Input.required = true;
            gt42Input.required = true;
        } else {
            liquidInputs.classList.remove('expanded');
            gt40Input.required = false;
            gt41Input.required = false;
            gt42Input.required = false;
        }
    });

    // Number parsing supporting commas
    const parseNumber = (val) => {
        if (!val) return null;
        return parseFloat(val.replace(',', '.'));
    };

    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = (progress * (end - start) + start).toFixed(1);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.classList.add('animate-pop');
                setTimeout(() => obj.classList.remove('animate-pop'), 400);
            }
        };
        window.requestAnimationFrame(step);
    };

    let latestRecord = null;
    let historyData = JSON.parse(localStorage.getItem('econet_history')) || [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const ulko = parseNumber(document.getElementById('ulko').value);
        const tulo = parseNumber(document.getElementById('tulo').value);
        const poisto = parseNumber(document.getElementById('poisto').value);
        const jateInput = document.getElementById('jate').value;
        const jate = parseNumber(jateInput);

        const flowTulo = parseNumber(document.getElementById('flow-tulo').value);
        const flowPoisto = parseNumber(document.getElementById('flow-poisto').value);

        const isLiquidActive = useLiquidCheckbox.checked;
        const gt40 = parseNumber(gt40Input.value);
        const gt41 = parseNumber(gt41Input.value);
        const gt42 = parseNumber(gt42Input.value);

        // Validation
        if (isNaN(ulko) || isNaN(tulo) || isNaN(poisto)) return;
        if (isLiquidActive && (isNaN(gt40) || isNaN(gt41) || isNaN(gt42))) return;

        // Calculate Tulo hyötysuhde
        let tuloHyoty = 0;
        if (poisto !== ulko) {
            if (isLiquidActive) {
                if (gt40 !== gt41) {
                    const osoittaja = (gt42 - gt41) * (tulo - ulko);
                    const nimittaja = (gt40 - gt41) * (poisto - ulko);
                    if (nimittaja !== 0) {
                        tuloHyoty = (osoittaja / nimittaja) * 100;
                    }
                }
            } else {
                tuloHyoty = ((tulo - ulko) / (poisto - ulko)) * 100;
            }
            // Air Flow adjustments (LTO.png kaava 7)
            if (flowTulo !== null && flowPoisto !== null && flowPoisto > 0 && !isNaN(flowTulo) && !isNaN(flowPoisto)) {
                let rLto = flowTulo / flowPoisto;
                tuloHyoty = ((1 + rLto) / 2) * tuloHyoty;
            }
            tuloHyoty = Math.max(0, Math.min(100, tuloHyoty));
        }

        // Show results
        resultContainer.classList.remove('hidden');

        // Animate tulo
        animateValue(tuloResult, 0, tuloHyoty, 1000);
        setTimeout(() => {
            tuloBar.style.width = `${tuloHyoty}%`;
            // Change color dynamically based on efficiency
            if (tuloHyoty < 50) tuloBar.style.background = 'linear-gradient(to right, #ef4444, #f87171)';
            else if (tuloHyoty < 67) tuloBar.style.background = 'linear-gradient(to right, #f59e0b, #fbbf24)';
            else tuloBar.style.background = 'linear-gradient(to right, #10b981, #34d399)';
        }, 50);

        // Calculate Poisto hyötysuhde if provided
        let poistoHyoty = null;
        if (jateInput.trim() !== '' && !isNaN(jate)) {
            poistoHyoty = 0;
            if (poisto !== ulko) {
                poistoHyoty = ((poisto - jate) / (poisto - ulko)) * 100;

                // Air Flow adjustments (LTO.png kaava 7 logiikka)
                if (flowTulo !== null && flowPoisto !== null && flowPoisto > 0 && !isNaN(flowTulo) && !isNaN(flowPoisto)) {
                    let rLto = flowTulo / flowPoisto;
                    poistoHyoty = ((1 + rLto) / 2) * poistoHyoty;
                }

                poistoHyoty = Math.max(0, Math.min(100, poistoHyoty));
            }

            poistoCard.classList.remove('hidden');
            animateValue(poistoResult, 0, poistoHyoty, 1000);
            setTimeout(() => {
                poistoBar.style.width = `${poistoHyoty}%`;
                if (poistoHyoty < 50) poistoBar.style.background = 'linear-gradient(to right, #ef4444, #f87171)';
                else if (poistoHyoty < 67) poistoBar.style.background = 'linear-gradient(to right, #f59e0b, #fbbf24)';
                else poistoBar.style.background = 'linear-gradient(to right, #10b981, #34d399)';
            }, 50);
        } else {
            poistoCard.classList.add('hidden');
            poistoResult.innerHTML = '0';
            poistoBar.style.width = '0%';
        }

        // Calculate Powers
        const flowLiquid = parseNumber(document.getElementById('flow-liquid').value);
        const egPctInput = document.getElementById('eg-pct').value;
        const egPct = parseNumber(egPctInput) || 0;

        const tuloTehoContainer = document.getElementById('tulo-teho-container');
        const poistoTehoContainer = document.getElementById('poisto-teho-container');

        let pIlmaTulo = null;
        let pNesteTulo = null;
        let pIlmaPoisto = null;
        let pNestePoisto = null;

        // Settings for liquid
        let pitoisuus = 0, rho = 998, c = 4190;
        if (isLiquidActive && !isNaN(flowLiquid) && flowLiquid > 0) {
            pitoisuus = Math.max(0, Math.min(100, egPct)) / 100.0;
            rho = 998 + (1113 - 998) * pitoisuus;
            c = 4190 + (2360 - 4190) * pitoisuus;
        }

        // Tuloilmapatteri
        if ((!isNaN(flowTulo) && flowTulo > 0) || (isLiquidActive && !isNaN(flowLiquid) && flowLiquid > 0 && !isNaN(gt40) && !isNaN(gt41))) {
            tuloTehoContainer.classList.remove('hidden');

            if (!isNaN(flowTulo) && flowTulo > 0) {
                pIlmaTulo = flowTulo * 1.2 * (tulo - ulko);
                document.getElementById('tulo-ilma-teho-result').innerText = Math.max(0, pIlmaTulo).toFixed(1);
            } else {
                document.getElementById('tulo-ilma-teho-result').innerText = '-';
            }

            if (isLiquidActive && !isNaN(flowLiquid) && flowLiquid > 0 && !isNaN(gt40) && !isNaN(gt41)) {
                const deltaTg = Math.abs(gt41 - gt40);
                pNesteTulo = (rho * c * flowLiquid * deltaTg) / 1000000.0;
                document.getElementById('tulo-neste-teho-result').innerText = pNesteTulo.toFixed(1);
            } else {
                document.getElementById('tulo-neste-teho-result').innerText = '-';
            }

            // Highlight check
            const tIlmaCard = document.getElementById('tulo-ilma-teho-card');
            const tNesteCard = document.getElementById('tulo-neste-teho-card');
            if (pIlmaTulo !== null && pNesteTulo !== null && pIlmaTulo > 0 && pNesteTulo > 0) {
                let pwrRelDiff = (Math.abs(pIlmaTulo - pNesteTulo) / Math.max(pIlmaTulo, pNesteTulo)) * 100;
                if (pwrRelDiff <= 15) {
                    tIlmaCard.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                    tIlmaCard.style.borderColor = 'rgba(16, 185, 129, 0.8)';
                    tNesteCard.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                    tNesteCard.style.borderColor = 'rgba(16, 185, 129, 0.8)';
                } else if (pwrRelDiff <= 30) {
                    tIlmaCard.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
                    tIlmaCard.style.borderColor = 'rgba(245, 158, 11, 0.8)';
                    tNesteCard.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
                    tNesteCard.style.borderColor = 'rgba(245, 158, 11, 0.8)';
                } else {
                    tIlmaCard.style.boxShadow = 'none'; tIlmaCard.style.borderColor = '';
                    tNesteCard.style.boxShadow = 'none'; tNesteCard.style.borderColor = '';
                }
            } else {
                tIlmaCard.style.boxShadow = 'none'; tIlmaCard.style.borderColor = '';
                tNesteCard.style.boxShadow = 'none'; tNesteCard.style.borderColor = '';
            }
        } else {
            tuloTehoContainer.classList.add('hidden');
        }

        // Poistoilmapatteri
        let showPoisto = false;
        if (jateInput.trim() !== '' && !isNaN(jate) && !isNaN(flowPoisto) && flowPoisto > 0) {
            pIlmaPoisto = flowPoisto * 1.2 * (poisto - jate);
            showPoisto = true;
        }
        if (isLiquidActive && !isNaN(flowLiquid) && flowLiquid > 0 && !isNaN(gt41) && !isNaN(gt42)) {
            const deltaTg = Math.abs(gt42 - gt41);
            pNestePoisto = (rho * c * flowLiquid * deltaTg) / 1000000.0;
            showPoisto = true;
        }

        if (showPoisto) {
            poistoTehoContainer.classList.remove('hidden');

            if (pIlmaPoisto !== null) {
                document.getElementById('poisto-ilma-teho-result').innerText = Math.max(0, pIlmaPoisto).toFixed(1);
            } else {
                document.getElementById('poisto-ilma-teho-result').innerText = '-';
            }

            if (pNestePoisto !== null) {
                document.getElementById('poisto-neste-teho-result').innerText = pNestePoisto.toFixed(1);
            } else {
                document.getElementById('poisto-neste-teho-result').innerText = '-';
            }

            // Highlight check
            const pIlmaCard = document.getElementById('poisto-ilma-teho-card');
            const pNesteCard = document.getElementById('poisto-neste-teho-card');
            if (pIlmaPoisto !== null && pNestePoisto !== null && pIlmaPoisto > 0 && pNestePoisto > 0) {
                let pwrRelDiff = (Math.abs(pIlmaPoisto - pNestePoisto) / Math.max(pIlmaPoisto, pNestePoisto)) * 100;
                if (pwrRelDiff <= 15) {
                    pIlmaCard.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                    pIlmaCard.style.borderColor = 'rgba(16, 185, 129, 0.8)';
                    pNesteCard.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                    pNesteCard.style.borderColor = 'rgba(16, 185, 129, 0.8)';
                } else if (pwrRelDiff <= 30) {
                    pIlmaCard.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
                    pIlmaCard.style.borderColor = 'rgba(245, 158, 11, 0.8)';
                    pNesteCard.style.boxShadow = '0 0 15px rgba(245, 158, 11, 0.4)';
                    pNesteCard.style.borderColor = 'rgba(245, 158, 11, 0.8)';
                } else {
                    pIlmaCard.style.boxShadow = 'none'; pIlmaCard.style.borderColor = '';
                    pNesteCard.style.boxShadow = 'none'; pNesteCard.style.borderColor = '';
                }
            } else {
                pIlmaCard.style.boxShadow = 'none'; pIlmaCard.style.borderColor = '';
                pNesteCard.style.boxShadow = 'none'; pNesteCard.style.borderColor = '';
            }
        } else {
            poistoTehoContainer.classList.add('hidden');
        }

        const ulkoinenTehoContainer = document.getElementById('ulkoinen-teho-container');
        let pNesteUlkoinen = null;
        if (isLiquidActive && !isNaN(flowLiquid) && flowLiquid > 0 && !isNaN(gt40) && !isNaN(gt42)) {
            const deltaTgUlkoinen = Math.abs(gt40 - gt42);
            pNesteUlkoinen = (rho * c * flowLiquid * deltaTgUlkoinen) / 1000000.0;
            if (ulkoinenTehoContainer) {
                document.getElementById('ulkoinen-teho-result').innerText = pNesteUlkoinen.toFixed(1);
                ulkoinenTehoContainer.classList.remove('hidden');
            }
        } else {
            if (ulkoinenTehoContainer) ulkoinenTehoContainer.classList.add('hidden');
        }

        // Store latest record for saving/emailing
        const currentLang = document.querySelector('.lang-btn.active[data-lang]') ? document.querySelector('.lang-btn.active[data-lang]').getAttribute('data-lang') : 'fi';
        const t = translations[currentLang];

        let reportText = `Date: ${new Date().toLocaleString()}\n`;
        reportText += `Target: ${document.getElementById('target-name').value || '-'}\n`;
        reportText += `------------------------------\n`;
        reportText += `${t.ulko}: ${ulko} °C\n`;
        reportText += `${t.tulo}: ${tulo} °C\n`;
        reportText += `${t.poisto}: ${poisto} °C\n`;
        if (flowTulo) reportText += `${t.flowtulo}: ${flowTulo} m³/s\n`;
        if (flowPoisto) reportText += `${t.flowpoisto}: ${flowPoisto} m³/s\n`;
        if (poistoHyoty !== null) reportText += `${t.jate}: ${jate} °C\n`;

        if (isLiquidActive) {
            reportText += `${t.gt40}: ${gt40} °C\n${t.gt41}: ${gt41} °C\n${t.gt42}: ${gt42} °C\n`;
            if (flowLiquid) reportText += `${t.liquid_flow}: ${flowLiquid} l/s\n${t.eg_pct}: ${egPct} %\n`;
        }
        reportText += `------------------------------\n`;
        reportText += `=== RESULTS ===\n`;
        reportText += `${t.res1}: ${tuloHyoty.toFixed(1)} %\n`;
        if (poistoHyoty !== null) reportText += `${t.res2}: ${poistoHyoty.toFixed(1)} %\n`;
        if (pIlmaTulo !== null && pIlmaTulo > 0) reportText += `${t.tulo_patteri_otsikko} (${t.res_ilma}): ${Math.max(0, pIlmaTulo).toFixed(1)} kW\n`;
        if (pNesteTulo !== null && pNesteTulo > 0) reportText += `${t.tulo_patteri_otsikko} (${t.res_neste}): ${pNesteTulo.toFixed(1)} kW\n`;
        if (pIlmaPoisto !== null && pIlmaPoisto > 0) reportText += `${t.poisto_patteri_otsikko} (${t.res_ilma}): ${Math.max(0, pIlmaPoisto).toFixed(1)} kW\n`;
        if (pNestePoisto !== null && pNestePoisto > 0) reportText += `${t.poisto_patteri_otsikko} (${t.res_neste}): ${pNestePoisto.toFixed(1)} kW\n`;
        if (pNesteUlkoinen !== null && pNesteUlkoinen > 0) reportText += `${t.ulkoinen_teho_otsikko}: ${pNesteUlkoinen.toFixed(1)} kW\n`;

        // BUILD VISUAL HTML DIAGRAM
        const template = document.getElementById('visual-diagram-template');
        const clone = template.content.cloneNode(true);
        const setVal = (sel, val, unit = '') => {
            const el = clone.querySelector(sel);
            if (el) el.innerHTML = (val !== null && val !== '-' && !isNaN(val)) ? `${val} <span style="font-size:0.75em;color:var(--text-muted);font-weight:normal;">${unit}</span>` : '-';
        };
        
        setVal('.val-jate', poistoHyoty !== null && !isNaN(jate) ? jate : '-', '°C');
        setVal('.val-poisto', !isNaN(poisto) ? poisto : '-', '°C');
        setVal('.val-tulo', !isNaN(tulo) ? tulo : '-', '°C');
        setVal('.val-ulko', !isNaN(ulko) ? ulko : '-', '°C');
        setVal('.val-gt42', isLiquidActive && !isNaN(gt42) ? gt42 : '-', '°C');
        setVal('.val-gt41', isLiquidActive && !isNaN(gt41) ? gt41 : '-', '°C');
        setVal('.val-gt41-bottom', isLiquidActive && !isNaN(gt41) ? gt41 : '-', '°C');
        setVal('.val-gt40', isLiquidActive && !isNaN(gt40) ? gt40 : '-', '°C');

        setVal('.val-poisto-p-ilma', pIlmaPoisto !== null && pIlmaPoisto > 0 ? Math.max(0, pIlmaPoisto).toFixed(1) : '-', 'kW');
        setVal('.val-poisto-p-neste', pNestePoisto !== null && pNestePoisto > 0 ? Math.max(0, pNestePoisto).toFixed(1) : '-', 'kW');
        setVal('.val-tulo-p-ilma', pIlmaTulo !== null && pIlmaTulo > 0 ? Math.max(0, pIlmaTulo).toFixed(1) : '-', 'kW');
        setVal('.val-tulo-p-neste', pNesteTulo !== null && pNesteTulo > 0 ? Math.max(0, pNesteTulo).toFixed(1) : '-', 'kW');
        setVal('.val-ulkoinen-teho', pNesteUlkoinen !== null && pNesteUlkoinen > 0 ? pNesteUlkoinen.toFixed(1) : '-', 'kW');
        
        setVal('.val-tulo-hyoty', tuloHyoty !== null ? tuloHyoty.toFixed(1) : '-', '%');
        setVal('.val-poisto-hyoty', poistoHyoty !== null ? poistoHyoty.toFixed(1) : '-', '%');
        setVal('.val-neste-virta', isLiquidActive && !isNaN(flowLiquid) && flowLiquid !== null ? flowLiquid : '-', 'l/s');
        
        if(!isNaN(flowPoisto) && flowPoisto !== null) clone.querySelector('.val-flow-poisto').innerText = flowPoisto + ' m³/s';
        if(!isNaN(flowTulo) && flowTulo !== null) clone.querySelector('.val-flow-tulo').innerText = flowTulo + ' m³/s';

        const labels = {
            fi: { j: 'Jäte', p: 'Poisto', t: 'Tulo', u: 'Ulko', pump: 'Lisäteho', meno: 'Meno', paluu: 'Paluu' },
            en: { j: 'Exhaust', p: 'Extract', t: 'Supply', u: 'Outdoor', pump: 'Ext. Power', meno: 'Supply', paluu: 'Return' },
            sv: { j: 'Avluft', p: 'Frånluft', t: 'Tilluft', u: 'Uteluft', pump: 'Extern Effekt', meno: 'Fram', paluu: 'Retur' }
        };
        const lbls = labels[currentLang] || labels.fi;
        clone.querySelector('.t-jate-lbl').innerText = lbls.j + ' (GT21)';
        clone.querySelector('.t-poisto-lbl').innerText = lbls.p + ' (GT20)';
        clone.querySelector('.t-tulo-lbl').innerText = lbls.t + ' (GT10)';
        clone.querySelector('.t-ulko-lbl').innerText = lbls.u + ' (GT00)';
        if (clone.querySelector('.t-lisateho-lbl')) clone.querySelector('.t-lisateho-lbl').innerText = lbls.pump;
        if (clone.querySelector('.t-gt42-lbl')) clone.querySelector('.t-gt42-lbl').innerText = 'GT42 (' + lbls.paluu + ')';
        if (clone.querySelector('.t-gt40-lbl')) clone.querySelector('.t-gt40-lbl').innerText = 'GT40 (' + lbls.meno + ')';
        if (clone.querySelector('.t-gt41-lbl')) clone.querySelector('.t-gt41-lbl').innerText = 'GT41 (' + lbls.paluu + ')';
        if (clone.querySelector('.t-diagram-res1')) clone.querySelector('.t-diagram-res1').innerText = t.res1;
        if (clone.querySelector('.t-diagram-res2')) clone.querySelector('.t-diagram-res2').innerText = t.res2;

        const tmpDiv = document.createElement('div');
        tmpDiv.appendChild(clone);
        const diagramHTML = tmpDiv.innerHTML;

        // Kaaviota ei enää näytetä päänäkymässä, vaan ainoastaan PDF-tulosteessa


        latestRecord = {
            date: new Date().toLocaleString(),
            target: document.getElementById('target-name').value || '-',
            raportti_teksti: reportText,
            diagram_html: diagramHTML,
            isSavedToHistory: false
        };
    });

    // History and Action Buttons
    document.getElementById('btn-save').addEventListener('click', (e) => {
        if (!latestRecord) {
            alert("Laske tulokset ensin! / Calculate results first! / Beräkna resultaten först!");
            return;
        }
        if (latestRecord.isSavedToHistory) {
            return; // Already saved
        }
        historyData = JSON.parse(localStorage.getItem('econet_history')) || [];
        historyData.push(latestRecord);
        localStorage.setItem('econet_history', JSON.stringify(historyData));
        latestRecord.isSavedToHistory = true; // Prevent saving exactly the same record multiple times

        const currentLang = document.querySelector('.lang-btn.active[data-lang]') ? document.querySelector('.lang-btn.active[data-lang]').getAttribute('data-lang') : 'fi';

        const btn = e.currentTarget;
        const originalHtml = btn.innerHTML;
        const originalBg = btn.style.background;
        const originalBorder = btn.style.borderColor;

        btn.innerHTML = `<span style="color: white; font-weight: bold;">✓ ${translations[currentLang].saved_alert}</span>`;
        btn.style.background = 'rgba(16, 185, 129, 0.4)';
        btn.style.borderColor = 'rgba(16, 185, 129, 0.6)';

        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.background = originalBg;
            btn.style.borderColor = originalBorder;
        }, 3000);
    });



    const historyModal = document.getElementById('history-modal');
    const historyList = document.getElementById('history-list');

    const renderHistory = () => {
        historyList.innerHTML = '';
        if (historyData.length === 0) {
            historyList.innerHTML = '<p style="color:white;text-align:center;">Ei historiaa. / No history.</p>';
            return;
        }
        historyData.slice().reverse().forEach(item => {
            const div = document.createElement('div');
            div.style.background = 'rgba(255,255,255,0.05)';
            div.style.padding = '10px';
            div.style.borderRadius = '8px';
            div.style.border = '1px solid rgba(255,255,255,0.1)';
            div.style.color = '#ddd';
            div.innerHTML = `
                <div style="font-weight:bold;margin-bottom:8px;color:white;display:flex;justify-content:space-between;align-items:center;">
                    <span>${item.target} <span style="font-size:0.8em;font-weight:normal;color:#aaa;margin-left:8px;">${item.date}</span></span>
                    <div style="display:flex; gap: 8px;">
                        <button class="history-pdf-btn" style="background:rgba(234, 179, 8, 0.4);border:1px solid rgba(234, 179, 8, 0.6);border-radius:6px;padding:4px 10px;color:white;cursor:pointer;font-size:0.8em;display:flex;align-items:center;gap:4px;transition:background 0.2s;" onmouseover="this.style.background='rgba(234, 179, 8, 0.6)'" onmouseout="this.style.background='rgba(234, 179, 8, 0.4)'">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            PDF
                        </button>
                        <button class="history-email-btn" style="background:rgba(59, 130, 246, 0.4);border:1px solid rgba(59, 130, 246, 0.6);border-radius:6px;padding:4px 10px;color:white;cursor:pointer;font-size:0.8em;display:flex;align-items:center;gap:4px;transition:background 0.2s;" onmouseover="this.style.background='rgba(59, 130, 246, 0.6)'" onmouseout="this.style.background='rgba(59, 130, 246, 0.4)'">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            Email
                        </button>
                    </div>
                </div>
                <!-- Wrap text in a printable container -->
                <div class="history-print-container">
                    <div style="font-size:0.9rem;white-space:pre-wrap;margin:15px 0 0 0;font-family:monospace;padding:10px;border-left:2px solid rgba(255,255,255,0.2);color:#f8fafc;line-height:1.4;">${item.raportti_teksti}</div>
                </div>
            `;

            const emailBtn = div.querySelector('.history-email-btn');
            emailBtn.addEventListener('click', () => {
                const subject = encodeURIComponent(`ECONET Tulokset - ${item.target}`);
                const body = encodeURIComponent(item.raportti_teksti);
                window.location.href = `mailto:?subject=${subject}&body=${body}`;
            });

            const pdfBtn = div.querySelector('.history-pdf-btn');
            pdfBtn.addEventListener('click', () => {
                const currentLang = document.querySelector('.lang-btn.active[data-lang]') ? document.querySelector('.lang-btn.active[data-lang]').getAttribute('data-lang') : 'fi';
                const t = translations[currentLang];

                const printDiv = document.createElement('div');
                printDiv.className = 'pdf-export-mode';
                printDiv.style.padding = '20px';
                
                printDiv.innerHTML = `
                    <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #000; padding-bottom: 20px;">
                        <h1 style="font-size: 2.5rem; margin: 0; padding: 0; font-weight: bold; color: #000;">${document.getElementById('t-title').innerText}</h1>
                        <h2 style="font-size: 1.5rem; margin: 10px 0 0 0; color: #333;">${document.getElementById('t-subtitle').innerText}</h2>
                        <h3 style="font-size: 2rem; margin: 30px 0 10px 0; color: #000; font-weight: bold;">${t.target_prefix || 'Kohde'}: ${item.target}</h3>
                        <p style="font-size: 1.1rem; color: #555; margin-top: 5px;">${item.date}</p>
                    </div>
                    <div style="margin: 20px 0 40px 0;">
                        ${item.diagram_html}
                    </div>
                    <div class="html2pdf__page-break"></div>
                    <div style="padding-top: 20px;">
                        <h2 style="font-size: 1.8rem; margin-bottom: 20px; color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">${t.calc_results || 'Laskennan tulokset'}</h2>
                        <pre style="font-family: monospace; font-size: 1.1rem; white-space: pre-wrap; color: #000; line-height: 1.6;">${item.raportti_teksti}</pre>
                    </div>
                `;

                // Update diagram labels in print wrapper to reflect currently selected language
                const labels = {
                    fi: { j: 'Jäte', p: 'Poisto', t: 'Tulo', u: 'Ulko', pump: 'Lisäteho', meno: 'Meno', paluu: 'Paluu' },
                    en: { j: 'Exhaust', p: 'Extract', t: 'Supply', u: 'Outdoor', pump: 'Ext. Power', meno: 'Supply', paluu: 'Return' },
                    sv: { j: 'Avluft', p: 'Frånluft', t: 'Tilluft', u: 'Uteluft', pump: 'Extern Effekt', meno: 'Fram', paluu: 'Retur' }
                };
                const lbls = labels[currentLang] || labels.fi;
                if (printDiv.querySelector('.t-jate-lbl')) printDiv.querySelector('.t-jate-lbl').innerText = lbls.j + ' (GT21)';
                if (printDiv.querySelector('.t-poisto-lbl')) printDiv.querySelector('.t-poisto-lbl').innerText = lbls.p + ' (GT20)';
                if (printDiv.querySelector('.t-tulo-lbl')) printDiv.querySelector('.t-tulo-lbl').innerText = lbls.t + ' (GT10)';
                if (printDiv.querySelector('.t-ulko-lbl')) printDiv.querySelector('.t-ulko-lbl').innerText = lbls.u + ' (GT00)';
                if (printDiv.querySelector('.t-lisateho-lbl')) printDiv.querySelector('.t-lisateho-lbl').innerText = lbls.pump;
                if (printDiv.querySelector('.t-gt42-lbl')) printDiv.querySelector('.t-gt42-lbl').innerText = 'GT42 (' + lbls.paluu + ')';
                if (printDiv.querySelector('.t-gt40-lbl')) printDiv.querySelector('.t-gt40-lbl').innerText = 'GT40 (' + lbls.meno + ')';
                if (printDiv.querySelector('.t-gt41-lbl')) printDiv.querySelector('.t-gt41-lbl').innerText = 'GT41 (' + lbls.paluu + ')';
                if (printDiv.querySelector('.t-diagram-res1')) printDiv.querySelector('.t-diagram-res1').innerText = t.res1;
                if (printDiv.querySelector('.t-diagram-res2')) printDiv.querySelector('.t-diagram-res2').innerText = t.res2;

                // Add temporarily to dom for layout rendering
                document.body.appendChild(printDiv);
                
                const opt = {
                    margin:       15,
                    filename:     `ECONET_Historia_${item.target.replace(/ /g, '_')}_${item.date.replace(/ /g, '_')}.pdf`,
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true, logging: false },
                    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
                };
                html2pdf().set(opt).from(printDiv).save().then(() => {
                    document.body.removeChild(printDiv);
                });
            });

            historyList.appendChild(div);
        });
    };

    document.getElementById('btn-history').addEventListener('click', () => {
        historyData = JSON.parse(localStorage.getItem('econet_history')) || [];
        renderHistory();
        historyModal.style.opacity = '1';
        historyModal.style.pointerEvents = 'all';
    });

    document.getElementById('btn-close-history').addEventListener('click', () => {
        historyModal.style.opacity = '0';
        historyModal.style.pointerEvents = 'none';
    });

    document.getElementById('btn-clear-history').addEventListener('click', () => {
        if (confirm("Valinta poistaa koko historian pysyvästi. Jatketaanko? / This will clear all history. Continue?")) {
            historyData = [];
            localStorage.removeItem('econet_history');
            renderHistory();
        }
    });

    document.getElementById('btn-export-csv').addEventListener('click', () => {
        if (historyData.length === 0) return;
        let csv = "Date,Target,Raportti\n";
        historyData.forEach(item => {
            csv += `"${item.date}","${item.target}","${item.raportti_teksti.replace(/"/g, '""')}"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "econet_historia.csv";
        link.click();
    });

    // Add subtle animation on focus
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.parentElement.style.transform = 'translateX(5px)';
            input.parentElement.parentElement.style.transition = 'transform 0.3s ease';
        });
        input.addEventListener('blur', () => {
            input.parentElement.parentElement.style.transform = 'translateX(0)';
        });
    });
});
