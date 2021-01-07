const makeRecipeInformationStub = (recipeId: string) => {
  return {
    name: 'Kartoffelsalat mit Kichererbsen und Spinat',
    energy: {
      kJ: '2047',
      kcal: '489',
    },
    protein: '13',
    carbs: '44',
    fat: '27',
    numberOfPortions: '2',
    recipeId,
  }
}

const makeRecipeInformationListStub = () => {
  return [
    {
      name: 'Kartoffelsalat mit Kichererbsen und Spinat',
      energy: {
        kJ: '2047',
        kcal: '489',
      },
      protein: '13',
      carbs: '44',
      fat: '27',
      numberOfPortions: '2',
      recipeId: 'r23142',
    },
    {
      name: 'Kartoffelsalat mit Kichererbsen und Spinat',
      energy: {
        kJ: '2047',
        kcal: '489',
      },
      protein: '13',
      carbs: '44',
      fat: '27',
      numberOfPortions: '2',
      recipeId: 'r23142',
    },
  ]
}

export {makeRecipeInformationStub, makeRecipeInformationListStub}
