const splitMessage = (message: string, maxLength: number): string[] => {
    const parts = [];
    for (let i = 0; i < message.length; i += maxLength) {
        parts.push(message.slice(i, i + maxLength));
    }
    return parts;
};

function formatString(str:string) {
  return str
    .toLowerCase()         // Convert to lowercase
    .replace(/,/g, '')     // Remove commas
    .replace(/\s+/g, '-')  // Replace spaces with dashes
    .normalize('NFD')      // Normalize the string to decompose accented characters
    .replace(/[\u0300-\u036f]/g, ''); // Remove diacritical marks
}

const wilayaMapping:{[key:number]:string} = {
    1: 'Adrar',
    2: 'Chlef',
    3: 'Laghouat',
    4: 'Oum El Bouaghi',
    5: 'Batna',
    6: 'Béjaïa',
    7: 'Biskra',
    8: 'Béchar',
    9: 'Blida',
    10: 'Bouira',
    11: 'Tamanrasset',
    12: 'Tébessa',
    13: 'Tlemcen',
    14: 'Tiaret',
    15: 'Tizi Ouzou',
    16: 'alger',
    17: 'Djelfa',
    18: 'Jijel',
    19: 'Sétif',
    20: 'Saïda',
    21: 'Skikda',
    22: 'Sidi Bel Abbès',
    23: 'Annaba',
    24: 'Guelma',
    25: 'Constantine',
    26: 'Médéa',
    27: 'Mostaganem',
    28: 'M\'Sila',
    29: 'Mascara',
    30: 'Ouargla',
    31: 'Oran',
    32: 'El Bayadh',
    33: 'Illizi',
    34: 'Bordj Bou Arréridj',
    35: 'Boumerdès',
    36: 'El Tarf',
    37: 'Tindouf',
    38: 'Tissemsilt',
    39: 'El Oued',
    40: 'Khenchela',
    41: 'Souk Ahras',
    42: 'Tipaza',
    43: 'Mila',
    44: 'Aïn Defla',
    45: 'Naâma',
    46: 'Aïn Témouchent',
    47: 'Ghardaïa',
    48: 'Relizane'
};

function getWilayaName(wilayaNumber:number):string {
    return wilayaMapping[wilayaNumber] || 'Invalid Wilaya number';
}


export {splitMessage,getWilayaName,formatString}