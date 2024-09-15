import React, { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
];

const searchStrings = {
  en: 'and laundering or lawsuit or scandal or fraud or investigation or crime or fine or accused or illegal or arrest or terrorism',
  it: 'E riciclaggio o causa legale o scandalo o frode o indagine o reato o multa o accusato o illegale o arresto o terrorismo',
  fr: 'AND blanchiment OR procès OR scandale OR fraude OR enquête OR crime OR amende OR accusé OR illégal OR arrestation OR terrorisme',
  nl: 'EN witwassen OR rechtszaak OR schandaal OR fraude OR onderzoek OR misdaad OR boete OR beschuldigd OR illegaal OR arrestatie OR terrorisme',
  es: 'Y blanqueo O querella O escándalo O fraude O investigación O delito O multa O acusado O ilegal O detención O terrorismo',
  sv: 'OCH tvättning ELLER stämning ELLER skandal ELLER bedrägeri ELLER utredning ELLER brott ELLER böter ELLER anklagad ELLER olaglig ELLER gripande ELLER terrorism',
  pt: 'E lavagem OU processo judicial OU escândalo OU fraude OU investigação OU crime OU multa OU acusado OU ilegal OU prisão OU terrorismo',
};

const KYCScreeningPlatform = () => {
  const [name, setName] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [searchLinks, setSearchLinks] = useState([]);

  const handleLanguageToggle = (langCode) => {
    setSelectedLanguages(prev => 
      prev.includes(langCode) 
        ? prev.filter(code => code !== langCode)
        : [...prev, langCode]
    );
  };

  const handleSearch = () => {
    const links = selectedLanguages.map(langCode => {
      const searchString = `"${name}" ${searchStrings[langCode]}`;
      const encodedSearch = encodeURIComponent(searchString);
      return {
        language: languages.find(lang => lang.code === langCode).name,
        url: `https://www.google.com/search?q=${encodedSearch}`
      };
    });
    setSearchLinks(links);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>KYC Adverse Media Screening</h1>
      <div>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => handleLanguageToggle(lang.code)}
            style={{
              padding: '5px 10px',
              background: selectedLanguages.includes(lang.code) ? '#007bff' : '#f8f9fa',
              color: selectedLanguages.includes(lang.code) ? 'white' : 'black',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            <span>{lang.flag}</span> {lang.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleSearch}
        disabled={!name || selectedLanguages.length === 0}
        style={{
          width: '100%',
          padding: '10px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Generate Search Links
      </button>
      {searchLinks.length > 0 && (
        <div>
          <h2>Search Links:</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {searchLinks.map((link, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                  {link.language} Search
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default KYCScreeningPlatform;
