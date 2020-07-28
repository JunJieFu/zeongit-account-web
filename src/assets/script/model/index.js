import _enum from "@/assets/script/constant/enum"

export class MenuEnum {
  /**
   * 菜单枚举
   * @param {String}label
   * @param {String}path
   * @param {String}icon
   */
  constructor(label, path, icon) {
    this.label = label
    this.path = path
    this.icon = icon
  }
}

export class SignInForm {
  constructor() {
    this.phone = ""
    this.password = ""
  }
}

export class SignUpForm {
  constructor(verificationCodeOperation) {
    this.phone = ""
    this.verificationCode = ""
    this.verificationCodeOperation = verificationCodeOperation
    this.password = ""
  }
}

export class ForgotForm {
  constructor(verificationCodeOperation) {
    this.phone = ""
    this.verificationCode = ""
    this.verificationCodeOperation = verificationCodeOperation
    this.password = ""
  }
}

export class UserForm {
  constructor() {
    this.nickname = ""
    this.birthday = ""
    this.gender = _enum.Gender.UNKNOWN.key
    this.introduction = ""
  }
}
