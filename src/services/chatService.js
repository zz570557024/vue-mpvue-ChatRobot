export default class Chat {
  getChatAnswer(service, question) {
    let option = {
      url: '/liang/questions/',
      data: {
        question: question
      },
      methods: 'GET',
      type: 0
    }
    return service.httpRequest(option)
  }
  getChatQus(service) {
    let option = {
      url: '/liang/requset_question/',
      methods: 'GET',
      type: 0
    }
    return service.httpRequest(option)
  }
  getChatEvaluation(service, data = {}) {
    let option = {
      url: '/liang/evaluation/',
      data: {
        question: data.question,
        answer: data.answer,
        evaluation: data.evaluation
      },
      methods: 'GET',
      type: 0
    }
    return service.httpRequest(option)
  }
}
