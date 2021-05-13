/* 

===== SKAPA RUM =====

rum som skapas ska bli objekt -->

  om lösenInput.value !== '', skapa rum med lösen -->
    {
      name: string,
      password: string,
      isPrivate: true
    }

  om lösenInput.value == '', skapa rum utan lösen -->
    {
      name: string,
      isPrivate: false
    }

  rum-objektet ska sparas på user ist för endast rumsnamnet

om isPrivate = true -->
  Lägg till rummet i listan + ' (Låst)'
om isPrivate = false -->
  Lägg till rummet i listan som vanligt

=====================

===== JOINA RUM =====

vid joinRoom event --> kolla om objekt med samma 'name' som option.value, isPrivate är true el false
vid true --> 
  kräv lösen
    vid korrekt lösen: joina rum
    vid fel lösen: kräv lösen igen
vid false --> 
  joina som vanligt

=====================


*/