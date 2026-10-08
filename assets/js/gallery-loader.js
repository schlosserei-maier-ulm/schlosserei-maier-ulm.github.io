// Auto-load images from gallery subfolders
document.addEventListener('DOMContentLoaded', async () => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const galleryName = gallery.getAttribute('data-gallery');
  if (!galleryName) return;

  // Determine base path based on current location
  const isInGalerie = location.pathname.includes('/pages/galerie/');
  const basePath = isInGalerie ? '../../' : '../';

  try {
    if (galleryName === 'all') {
      // Load all galleries
      loadAllGalleries(basePath, gallery);
    } else {
      // Load specific gallery
      const imagePath = `${basePath}assets/images/galerie/${galleryName}/`;
      const imageMap = {
        'balkone': [
          'Balkongeländer-Milchglasfüllung.jpg',
          'Balkongeländer-MilchglasfüllungII.jpg',
          'Balkongeländer-Milchglasfüllung-mit-Handlauf.jpg',
          'Balkongeländer-mit-VA-Halterungen-und-Milchglasfüllung.jpg',
          'Balkongeländer-mit-pulverbeschichteten-Lamellen.jpg',
          'Balkongeländer-mit-satiniertem-Glas.jpg',
          'Edelstahl-mit-Klarglas-ohne-Handlauf.jpg',
          'Verz.-Ausführung-Füllung-Trespaplatten-II.jpg',
          'Verzinkte-Ausführung-Füllung-Trespaplatten.jpg',
          'Verz.-Ausführung-Lochblechfüllung.jpg'
        ],
        'treppen': [
          'Stahlwangentreppe-mit-Podest.jpg',
          'Stahltreppe-verzinkt-mit-Gitterroststufen-und-Edelstahlhandlauf-e1472556612387.jpg',
          'Treppengelaender-Stahlwange-mit-Podest.jpg',
          'Wendeltreppe-mit-Edelstahlgelaender.jpg',
          'Treppengeländer-aus-Klarglas-mit-VA-Punkthaltern.jpg',
          'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-I.jpg',
          'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-II.jpg',
          'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-III-e1495619337769.jpg',
          'TreppenhausfestverglasungI.jpg',
          'R-Treppe-1.jpg',
          'R-Treppe.jpg'
        ],
        'vordaecher': [
          'Balkon-und-Terrassenüberdachung-in-verzinkter-Ausführung.jpg',
          'Edelstahl-Vordach-mit-Klarglas-Variante-1.jpg',
          'Vordach-mit-Polycarbonat-Eindeckung.jpg',
          'Moderner-Vordach-mit-Edelstahl-Unterkonstruktion.jpg',
          'Edelstahlvordach-mit-Klarglasfüllung.jpg',
          'Freitragendes-Vordach-mit-Milchglasfüllung-Wandkonsolen-pulverbeschichtet.jpg',
          'Glasvordach-mit-Edelstahlpunkthaltern-e1495617990629.jpg',
          'Terrassenüberdachung-verzinkte-Ausführung-I.jpg'
        ],
        'franzoesische-balkone': [
          'Franzoesischer-Balkon-Edelstahl-Klarglas-Variante-1.jpg',
          'Franzoesischer-Balkon-Edelstahl-Klarglas-Variante-2.jpg'
        ],
        'gartentueren': [
          'Gartentuer-mit-Edelstahlrahmen.jpg',
          'Gartentüre-aus-Flachstahl.jpg',
          'Gartentüre-mit-Briefkastenanlage.jpg',
          'Gartentüre-Rahmen-verzinkt-Füllung-Trespa-e1570009070479.jpg',
          'Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa-1.jpg',
          'Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa.jpg'
        ],
        'briefkastenanlagen': [
          'Briefkasten.jpg',
          'Briefkasten-Mehrfach-Edelstahl.jpg',
          'Freistehender-Briefkasten.jpg',
          'Gartentüre-mit-Briefkastenanlage.jpg'
        ],
        'sonderkonstruktionen': [
          'Blumenkübel-II.jpg',
          'Blumenkübel-I.jpg',
          'Holzregal.jpg',
          'Rampe-II-scaled-e1728295107225.jpeg',
          'Rollstuhlrampe-verzinkte-Ausführung.jpg',
          'Sichtschutz-Edelstahlleiste-Motivglas-I.jpg',
          'VA-Riffelblech.jpg',
          'Weinregal.jpg'
        ]
      };

      const images = imageMap[galleryName] || [];
      loadGalleryImagesFromList(images, imagePath, gallery, galleryName);
    }
  } catch (error) {
    console.error('Error loading gallery:', error);
  }
});

function loadAllGalleries(basePath, gallery) {
  const galleries = {
    'balkone': [
      'Balkongeländer-Milchglasfüllung.jpg',
      'Balkongeländer-MilchglasfüllungII.jpg',
      'Balkongeländer-Milchglasfüllung-mit-Handlauf.jpg',
      'Balkongeländer-mit-VA-Halterungen-und-Milchglasfüllung.jpg',
      'Balkongeländer-mit-pulverbeschichteten-Lamellen.jpg',
      'Balkongeländer-mit-satiniertem-Glas.jpg',
          'Edelstahl-mit-Klarglas-ohne-Handlauf.jpg',
      'Verz.-Ausführung-Füllung-Trespaplatten-II.jpg',
      'Verzinkte-Ausführung-Füllung-Trespaplatten.jpg',
      'Verz.-Ausführung-Lochblechfüllung.jpg'
    ],
    'treppen': [
      'Stahlwangentreppe-mit-Podest.jpg',
      'Stahltreppe-verzinkt-mit-Gitterroststufen-und-Edelstahlhandlauf-e1472556612387.jpg',
      'Treppengelaender-Stahlwange-mit-Podest.jpg',
      'Wendeltreppe-mit-Edelstahlgelaender.jpg',
      'Treppengeländer-aus-Klarglas-mit-VA-Punkthaltern.jpg',
      'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-I.jpg',
      'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-II.jpg',
      'VA-Treppengeländer-mit-Klarglasfüllung-und-VA-Glashalter-III-e1495619337769.jpg',
      'TreppenhausfestverglasungI.jpg',
      'R-Treppe-1.jpg',
      'R-Treppe.jpg'
    ],
    'vordaecher': [
      'Balkon-und-Terrassenüberdachung-in-verzinkter-Ausführung.jpg',
      'Edelstahl-Vordach-mit-Klarglas-Variante-1.jpg',
      'Vordach-mit-Polycarbonat-Eindeckung.jpg',
      'Moderner-Vordach-mit-Edelstahl-Unterkonstruktion.jpg',
      'Edelstahlvordach-mit-Klarglasfüllung.jpg',
      'Freitragendes-Vordach-mit-Milchglasfüllung-Wandkonsolen-pulverbeschichtet.jpg',
      'Glasvordach-mit-Edelstahlpunkthaltern-e1495617990629.jpg',
      'Terrassenüberdachung-verzinkte-Ausführung-I.jpg'
    ],
    'franzoesische-balkone': [
      'Franzoesischer-Balkon-Edelstahl-Klarglas-Variante-1.jpg',
      'Franzoesischer-Balkon-Edelstahl-Klarglas-Variante-2.jpg'
    ],
    'gartentueren': [
      'Gartentuer-mit-Edelstahlrahmen.jpg',
      'Gartentüre-aus-Flachstahl.jpg',
      'Gartentüre-mit-Briefkastenanlage.jpg',
      'Gartentüre-Rahmen-verzinkt-Füllung-Trespa-e1570009070479.jpg',
      'Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa-1.jpg',
      'Hoftor-mit-Gartentüre.-Rahmen-aus-pulverbeschitetem-Material-Füllung-Trepa.jpg'
    ],
    'briefkastenanlagen': [
      'Briefkasten.jpg',
      'Briefkasten-Mehrfach-Edelstahl.jpg',
      'Freistehender-Briefkasten.jpg',
      'Gartentüre-mit-Briefkastenanlage.jpg'
    ],
    'sonderkonstruktionen': [
      'Blumenkübel-II.jpg',
      'Blumenkübel-I.jpg',
      'Holzregal.jpg',
      'Rampe-II-scaled-e1728295107225.jpeg',
      'Rollstuhlrampe-verzinkte-Ausführung.jpg',
      'Sichtschutz-Edelstahlleiste-Motivglas-I.jpg',
      'VA-Riffelblech.jpg',
      'Weinregal.jpg'
    ]
  };

  Object.entries(galleries).forEach(([name, images]) => {
    const imagePath = `${basePath}assets/images/galerie/${name}/`;
    loadGalleryImagesFromList(images, imagePath, gallery, name);
  });
}

function loadGalleryImagesFromList(images, imagePath, gallery, categoryName) {
  // Human-readable category labels for camera-filename fallbacks
  const categoryLabels = {
    'balkone': 'Balkongeländer',
    'treppen': 'Treppengeländer',
    'vordaecher': 'Vordach',
    'franzoesische-balkone': 'Französischer Balkon',
    'gartentueren': 'Gartentüre',
    'briefkastenanlagen': 'Briefkastenanlage',
    'sonderkonstruktionen': 'Sonderkonstruktion'
  };

  images.forEach(filename => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = imagePath + filename;

    // Generate meaningful alt text from filename
    let alt = filename
      .replace(/\.[^/.]+$/, '')       // strip file extension
      .replace(/-e\d{10,}/, '')       // strip WordPress hash suffixes
      .replace(/-scaled/, '')         // strip "scaled" suffix
      .replace(/-\d{1,2}$/, '')       // strip trailing variant numbers (-1, -002)
      .replace(/-/g, ' ');            // hyphens to spaces

    // Replace camera-generated filenames (DSC/IMG) with category label
    if (/^(DSC|IMG)[\d_ ]+$/.test(alt.trim())) {
      alt = categoryLabels[categoryName] || alt;
    }

    img.alt = alt;
    figure.appendChild(img);
    gallery.appendChild(figure);
  });
}

