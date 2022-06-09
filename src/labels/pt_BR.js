module.exports = {
  errors: {
    notFound: (entity) => `${entity} não encontrado!`,
    alreadyExists: (entity, keyName) => `Já existe um ${entity} com este ${keyName}`,
    wrongPassword: () => "Senha incorreta.",
    wrongOldPassword: () => "Sua senha antiga não é válida.",
    samePassword: () => "Sua nova senha precisa ser diferente de sua senha antiga",
    confirmPassword: () => "A senha atual e confirmação de senha não são iguais",
    passwordFields: () => "Por favor preencha todos os campos de senha",
    internalCreation: () => 'Algo deu errado enquanto criava um usuário. Por favor verifique sua conexão com a internet!',
    notProvided: () => "Token não foi provido",
    invalidToken: () => "Houve um erro na sua sessão. Por favor faça o login novamente.",
    imageError: () => "Ocorreu um erro ao carregar sua imagem. Por favor tente novamente.",
    missing: () => "A sua requisição está incompleta, verifique os campos e tente novamente"
  }
}
