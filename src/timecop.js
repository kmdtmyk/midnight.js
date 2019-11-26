const dateNow = Date.now
let now = null

export default class{

  static freeze(){
    now = Date.now()
    Date.now = () => now
  }

  static return(){
    Date.now = dateNow
  }

  static travel(time){
    now = time
  }

}
