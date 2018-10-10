<template>
  <div id="info-page">
    <x-header :left-options="{showBack: false}" class="header">{{title}}</x-header>
    <div class="page-main">
      <div>
        <group>
          <cell class="title" :title="'(一)会员基本情况'" :value="'MEMBERSHIP INFOMATION'"></cell>
          <cell title="性别" :class="{'not-finish': sexNotFinish}">
            <span slot="default" class="mock-select" @click="openPop('sex', 'radio')">{{sex.value}}</span>
          </cell>
          <cell title="从事的行业/职业" :class="{'not-finish': jobNotFinish}">
            <span slot="default" class="mock-select" @click="openPop('job', 'radio')">{{job.value}}</span>
          </cell>
          <cell title="希望俱乐部举办规模形式" :class="{'not-finish': formNotFinish}">
            <span slot="default" class="mock-select" @click="openPop('form', 'checkbox')">
              <span v-for="(item, index) in form" :key="index">{{index > 0 ? '/' + item.value : item.value}}</span>

            </span>
          </cell>
          <cell title="希望提供的增值服务(可多选)" class="more-services openMore" >
            <span slot="default" class="mock-select services"></span>
          </cell>
          <div >
            <cell title="A 医疗健康" :class="{'not-finish': medicalNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('medical', 'checkbox')">
                <span v-for="(item, index) in medical" :key="index">{{index > 0 ? '/' + item.value : item.value}}</span>
              </span>
            </cell>
            <cell title="B 子女教育" :class="{'not-finish': educationNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('education', 'checkbox')">
                <span v-for="(item, index) in education" :key="index">{{index > 0 ? '/' + item.value : item.value}}</span>
              </span>
            </cell>
            <cell title="C 财富传承" :class="{'not-finish': richNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('rich', 'checkbox')">
                <span v-for="(item, index) in rich" :key="index">{{index > 0 ? '/' + item.value : item.value}}</span>
              </span>
            </cell>
            <cell title="D 生活娱乐" :class="{'not-finish': lifeNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('life', 'checkbox')">
                <span v-for="(item, index) in life" :key="index">{{index > 0 ? '/' + item.value : item.value}}</span>
              </span>
            </cell>
            <cell title="E 其他" :class="{'not-finish': otherNotFinish}">
              <input type="text" slot="default" class="mock-ipt" placeholder="请填写" v-model="other" @change="handleOther">
            </cell>
          </div>

        </group>
      </div>
      <div>
        <group>
          <cell class="title" :title="'(二)既往慢性病患病情况'" :value="'MEMBERSHIP INFOMATION'">
            <p slot="default">CHRONIC DISEASES <br>INFORMATION</p>
          </cell>
          <cell title='是否患有"三高"病症(可多选)' :class="{'not-finish': threeHNotFinish}">
            <span slot="default" class="mock-select" @click="openPop('threeH', 'checkbox')">
              <span v-for="(item, index) in threeH" :key="index">{{index > 0 ? '/' : ''}}{{item.value}}</span>
            </span>
          </cell>
          <cell title="是否曾被诊断为心脏类疾病" :class="{'not-finish': hearttypeNotFinish}">
            <span slot="default" class="mock-select" @click="openPop('hearttype', 'radio')">{{hearttype.value}}

            </span>
          </cell>
          <cell title="是否晕车" :class="{'not-finish': carsicknessNotFinish}">
            <span slot="default" class="mock-select" @click="openPop('carsickness', 'radio')">{{carsickness.value}}
            </span>

          </cell>
          <cell title="过敏性疾病" class="openMore more-services" >
            <span slot="default" class="mock-select services"></span>
          </cell>
          <div>
            <cell title="A 您对什么食物过敏吗？" :class="{'not-finish': foodallergyNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('foodallergy', 'radio')">{{foodallergy.value}}</span>
            </cell>
            <cell title="B 您对什么药物过敏吗？" :class="{'not-finish': drugallergyNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('drugallergy', 'radio')">{{drugallergy.value}}</span>
            </cell>
            <cell title="C 您知道自己对什么其他物质过敏吗？" :class="{'not-finish': otherallergyNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('otherallergy', 'radio')">{{otherallergy.value}}</span>
            </cell>
          </div>
        </group>
      </div>

      <div>
        <group>
          <cell class="title" :title="'(三)健康相关行为'" :value="'HEALTH INFOMATION'"></cell>
          <cell title='您吸烟吗？' :class="{'not-finish': isSmokeNotFinish}">
            <span slot="default" class="mock-select" @click="openPop('isSmoke', 'radio')">{{isSmoke.value}}</span>
          </cell>
          <cell title="您饮酒吗？" :class="{'not-finish': isDrinkNotFinish}">
            <span slot="default" class="mock-select" @click="openPop('isDrink', 'radio')">{{isDrink.value}}</span>
          </cell>
          <cell title="有无宗教信仰？" :class="{'not-finish': religionNotFinish}">
            <span slot="default" class="mock-select" @click="openPop('religion', 'radio')">{{religion.value}}</span>
          </cell>
          <cell title="关于饮食" class="openMore more-services">
            <span slot="default" class="mock-select services"></span>
          </cell>
          <div>
            <cell title="A 您每日的食盐习惯？" :class="{'not-finish': saltNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('salt', 'radio')">{{salt.value}}</span>
            </cell>
            <cell title="B 您日常使用油脂的习惯？" :class="{'not-finish': oilNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('oil', 'radio')">{{oil.value}}</span>
            </cell>
            <cell title="C 您经常吃下列哪种食品？(经常指每月4次以上)" :class="{'not-finish': oftenFoodNotFinish}">
              <span slot="default" class="mock-select" @click="openPop('oftenFood', 'radio')">{{oftenFood.value}}</span>
            </cell>

          </div>
        </group>
      </div>

      <group class="btn-area">
        <x-button type="button" class="member-rights-btn" @click.native="submit">提交</x-button>
      </group>
    </div>
    <div class="popup" v-show="isPopup" @click="hidePop">
      <div class="popup-main">
        <div class="select-item" v-for="(item, index) in popupOpts" :key="index" @click="stopHide">
          <label>
            <input v-if="popupCheckType==='radio'" type="radio" :value="item.key" @change="selectItem(index)" v-model="popChecked">
            <input v-if="popupCheckType==='checkbox'" type="checkbox" :value="item.key" @change="selectItem(index)" v-model="popChecked">
            {{item.value}}
            <input type="text" v-show="item.hasOwnProperty('desc')" v-model="item.desc" class="mock-ipt" placeholder="请描述" @change="selectItem(index)">
            <span class="checkIcon"  v-show="popChecked.indexOf(item.key) >= 0"><x-icon type="ios-checkmark-empty"></x-icon></span>
          </label>

        </div>
      </div>
    </div>

    <toast v-model="toast" :time="1000" width="auto" type="text">{{toastMsg}}</toast>
  </div>
</template>
<script>
  import { XHeader, XButton, Group, Cell, Selector, Toast } from 'vux'

  export default {
    components: {
      XHeader,
      XButton,
      Group,
      Cell,
      Selector,
      Toast
    },
    name: '',
    data () {
      return {
        title: '完善信息',
        other: '',
        isShowMore: false,
        isPopup: false,

        sexNotFinish: false,
        jobNotFinish: false,
        formNotFinish: false,
        carsicknessNotFinish: false,
        hearttypeNotFinish: false,
        richNotFinish: false,
        threeHNotFinish: false,
        educationNotFinish: false,
        medicalNotFinish: false,
        otherNotFinish: false,
        lifeNotFinish: false,
        foodallergyNotFinish: false,
        drugallergyNotFinish: false,
        otherallergyNotFinish: false,
        isSmokeNotFinish: false,
        isDrinkNotFinish: false,
        saltNotFinish: false,
        oilNotFinish: false,
        oftenFoodNotFinish: false,
        religionNotFinish: false,

        sex: {value: '请选择'},
        job: {value: '请选择'},
        form: [{value: '请选择'}],
        carsickness: {value: '请选择'},
        hearttype: {value: '请选择'},
        rich: [{value: '请选择'}],
        threeH: [{value: '请选择'}],
        education: [{value: '请选择'}],
        medical: [{value: '请选择'}],
        life: [{value: '请选择'}],
        foodallergy: {value:'请选择'},
        drugallergy: {value: '请选择'},
        otherallergy: {value: '请选择'},
        isSmoke: {value: '请选择'},
        isDrink: {value: '请选择'},
        salt: {value: '请选择'},
        oil: {value: '请选择'},
        oftenFood: {value: '请选择'},
        religion: {value: '请选择'},
        religionOpt: [
          {key: '1', value:'没有'},
          {key: '2', value:'有', desc: ''}
        ],
        oftenFoodOpt: [
          {key: '1', value: '炸'},
          {key: '2', value: '红烧'},
          {key: '3', value: '腌制'},
          {key: '4', value: '甜食'},
          {key: '5', value: '动物内脏'},
          {key: '6', value: '都基本不吃'},
        ],
        oilOpt: [
          {key: '1', value: '清淡少油食物'},
          {key: '2', value: '食油量适中'},
          {key: '3', value: '喜油量偏大的食物'},
          {key: '4', value: '食油量较大'}
        ],
        saltOpt: [
          {key: '1', value: '喜清淡'},
          {key: '2', value: '口味适中'},
          {key: '3', value: '口味偏重'},
          {key: '4', value: '口味很重'}
        ],
        isDrinkOpt: [
          {key: '1', value: '经常饮酒'},
          {key: '2', value: '偶尔'},
          {key: '3', value: '滴酒不沾'}
        ],
        isSmokeOpt: [
          {key: '1', value: '经常吸'},
          {key: '2', value: '偶尔吸'},
          {key: '3', value: '从不吸'}
        ],
        otherallergyOpt: [
          {key: '1', value:'没有'},
          {key: '2', value:'有', desc: ''}
        ],
        drugallergyOpt: [
          {key: '1', value:'没有'},
          {key: '2', value:'有', desc: ''}
        ],
        foodallergyOpt: [
          {key: '1', value:'没有'},
          {key: '2', value:'有', desc: ''}
        ],
        lifeOpt: [
          {key: '1', value: '与大咖同台切磋竞技类项目（网球、马术、赛车）'},
          {key: '2', value: '稀缺赛事、影视音乐活动参与资格（海外、引进）'},
          {key: '3', value: '直击时尚发布会（维密秀、一线品牌新品发布会）'},
        ],
        richOpt: [
          {key: '1', value: '家族财富传承课程、企业家游学（如德国企业精细化管理之旅）等'},
          {key: '2', value: '资源对接会：客户所在行业的跨省对接会、企业家洽谈会等'},
        ],
        medicalOpt: [
          {key: '1', value: '国内外知名高端医疗健康服务'},
          {key: '2', value: '女性日常高端美容美体护理'},
          {key: '3', value: '高端月子中心'},
        ],
        educationOpt: [
          {key: '1', value:'王牌分享：知名少年成长经验分享(含)'},
          {key: '2', value:'国际学校交流参观：国际常青藤、西点军校等'},
          {key: '3', value:'青少年培养项目(夏令营)：乔丹篮球营、维也纳音乐营、机器人构建营等'},
        ],

        threeHOpt: [
          {key: '1', value: '高血压'},
          {key: '2', value: '糖尿病'},
          {key: '3', value: '血脂异常'},
          {key: '4', value: '同时患有2项以上'},
          {key: '5', value: '否'}
        ],
        hearttypeOpt: [
          {key: '1', value: '冠心病'},
          {key: '2', value: '脑卒中(中风)'},
          {key: '3', value: '心律失常'},
          {key: '4', value: '风湿性心脏病'},
          {key: '5', value: '同时患2项以上'},
          {key: '6', value: '否'},
        ],
        carsicknessOpt: [
          {key: '1', value: '是'},
          {key: '2', value: '否'},
        ],
        sexOpt: [
          {key: '1', value: '男'},
          {key: '2', value: '女'}
        ],
        jobOpt: [
          {key: '1', value: '金融业'},
          {key: '2', value: '公职人员(公务员、律师)'},
          {key: '3', value: '医疗行业'},
          {key: '4', value: '教育事业'},
          {key: '5', value: '媒体行业(广告、公关、文化娱乐)'},
          {key: '6', value: '科技行业(研发、IT)'},
          {key: '7', value: '其他'},
        ],
        formOpt: [
          {key: '1', value: '10人以下'},
          {key: '2', value: '20-50人'},
          {key: '3', value: '50-100人'},
          {key: '4', value: '100-200人'},
          {key: '5', value: '200人以上'}
        ],
        popupOpts: {},
        popupCheckType: 'radio',
        popupKeyType: '',
        popChecked: [],
        popDesc: '',

        toast: false,
        toastMsg: ''
      }
    },
    methods: {
      getFullInfo () {
        let _self = this
        this.$ajax
          .get('/index/user/get_userperfect', {params: {sign: localStorage['sign']}})
          .then(res => {
            //console.log(res)
            let _data = res.data.data
            if(_data.gender){
              _self.sex = _self.sexOpt[+_data.gender - 1]

            }
            if(_data.industry){
              _self.job = _self.jobOpt[+_data.industry -1]

            }
            if(_data.activity_scale && _data.activity_scale.length > 0) {
              _self.form = []
              _data.activity_scale.split(',').forEach((item) => {
                _self.form.push(_self.formOpt[+item - 1])
              })
            }
            if(_data.medical_care && _data.medical_care.length > 0){
              _self.medical = []

              _data.medical_care.split(',').forEach((item) => {
                _self.medical.push(_self.medicalOpt[+item - 1])
              })
            }
            if(_data.education && _data.education.length > 0) {
              _self.education = []
              _data.education.split(',').forEach((item) => {
                _self.education.push(_self.educationOpt[+item - 1])
              })
            }
            if(_data.wealth && _data.wealth.length > 0) {
              _self.rich = []
              _data.wealth.split(',').forEach((item) => {
                _self.rich.push(_self.richOpt[+item - 1])
              })
            }
            if(_data.life_happy && _data.life_happy.length > 0) {
              _self.life = []
              _data.life_happy.split(',').forEach((item) => {
                _self.life.push(_self.lifeOpt[+item - 1])
              })
            }
            if(_data.other){
              _self.other = _data.other

            }

            if(_data.three_high && _data.three_high.length > 0) {
              _self.threeH = []
              _data.three_high.split(',').forEach((item) => {
                _self.threeH.push(_self.threeHOpt[+item - 1])
              })
            }
            if(_data.heart_disease){
              _self.hearttype = _self.hearttypeOpt[+_data.heart_disease - 1]

            }
            if(_data.is_gosh_car){
              _self.carsickness = _self.carsicknessOpt[+_data.is_gosh_car - 1]

            }

            if(_data.food_allergy){
              if(_self.foodallergyOpt[0].value === _data.food_allergy){
                _self.foodallergy = _self.foodallergyOpt[0]
              }else{
                _self.foodallergy = _self.foodallergyOpt[1]
                _self.foodallergyOpt[1].desc = _data.food_allergy

              }
            }
            if(_data.drug_allergy){
              if(_self.drugallergyOpt[0].value === _data.drug_allergy){
                _self.drugallergy = _self.drugallergyOpt[0]
              }else{
                _self.drugallergy = _self.drugallergyOpt[1]
                _self.drugallergyOpt[1].desc = _data.drug_allergy

              }
            }
            if(_data.other_allergy){
              if(_self.otherallergyOpt[0].value === _data.other_allergy){
                _self.otherallergy = _self.otherallergyOpt[0]
              }else{
                _self.otherallergy = _self.otherallergyOpt[1]
                _self.otherallergyOpt[1].desc = _data.other_allergy

              }
            }


            if(_data.is_smoking){
              _self.isSmoke = _self.isSmokeOpt[+_data.is_smoking -1]

            }
            if(_data.is_drink){
              _self.isDrink = _self.isDrinkOpt[+_data.is_drink -1]

            }
            if(_data.salt_habit){
              _self.salt = _self.saltOpt[+_data.salt_habit -1]

            }
            if(_data.oil_habit){
              _self.oil = _self.oilOpt[+_data.oil_habit -1]

            }
            if(_data.food_habit){
              _self.oftenFood = _self.oftenFoodOpt[+_data.food_habit -1]

            }
            if(_data.religious){
              if(_self.religionOpt[0].value === _data.religious){
                _self.religion = _self.religionOpt[0]
              }else{
                _self.religion = _self.religionOpt[1]
                _self.religionOpt[1].desc = _data.religious

              }
            }
          })
      },
      showMore () {
        this.isShowMore = !this.isShowMore

        //console.log(this.isShowMore)
      },
      submit () {
        let _self = this;
        if(
          !this.sex.hasOwnProperty('key') ||
          !this.job.hasOwnProperty('key') ||
          this.form[0].value === '请选择' ||
          this.medical[0].value === '请选择' ||
          this.education[0].value === '请选择' ||
          this.rich[0].value === '请选择' ||
          this.life[0].value === '请选择' ||
          this.other.length === 0 ||
          this.threeH[0].value === '请选择' ||
          !this.hearttype.hasOwnProperty('key') ||
          !this.carsickness.hasOwnProperty('key') ||
          !this.foodallergy.hasOwnProperty('key') ||
          !this.drugallergy.hasOwnProperty('key') ||
          !this.otherallergy.hasOwnProperty('key') ||
          !this.isSmoke.hasOwnProperty('key') ||
          !this.isDrink.hasOwnProperty('key') ||
          !this.religion.hasOwnProperty('key') ||
          !this.salt.hasOwnProperty('key') ||
          !this.oil.hasOwnProperty('key') ||
          !this.oftenFood.hasOwnProperty('key')
        ){
          _self.toast = true;
          _self.toastMsg = '信息填写未完成'

          this.sex.hasOwnProperty('key') ? _self.sexNotFinish = false : _self.sexNotFinish = true
          this.job.hasOwnProperty('key') ? _self.jobNotFinish = false : _self.jobNotFinish = true
          this.form[0].value === '请选择' ? _self.formNotFinish = true : _self.formNotFinish = false
          this.medical[0].value === '请选择' ? _self.medicalNotFinish = true : _self.medicalNotFinish = false
          this.education[0].value === '请选择' ? _self.educationNotFinish = true : _self.educationNotFinish = false
          this.rich[0].value === '请选择' ? _self.richNotFinish = true : _self.richNotFinish = false
          this.life[0].value === '请选择' ? _self.lifeNotFinish = true : _self.lifeNotFinish = false
          this.other.length === 0 ? _self.otherNotFinish = true : _self.otherNotFinish = false
          this.threeH[0].value === '请选择' ? _self.threeHNotFinish = true : _self.threeHNotFinish = false
          this.hearttype.hasOwnProperty('key') ? _self.hearttypeNotFinish = false : _self.hearttypeNotFinish = true
          this.carsickness.hasOwnProperty('key') ? _self.carsicknessNotFinish = false : _self.carsicknessNotFinish = true
          this.foodallergy.hasOwnProperty('key') ? _self.foodallergyNotFinish = false : _self.foodallergyNotFinish = true
          this.drugallergy.hasOwnProperty('key') ? _self.drugallergyNotFinish = false : _self.drugallergyNotFinish = true
          this.otherallergy.hasOwnProperty('key') ? _self.otherallergyNotFinish = false : _self.otherallergyNotFinish = true
          this.isSmoke.hasOwnProperty('key') ? _self.isSmokeNotFinish = false : _self.isSmokeNotFinish = true
          this.isDrink.hasOwnProperty('key') ? _self.isDrinkNotFinish = false : _self.isDrinkNotFinish = true
          this.religion.hasOwnProperty('key') ? _self.religionNotFinish = false : _self.religionNotFinish = true
          this.salt.hasOwnProperty('key') ? _self.saltNotFinish = false : _self.saltNotFinish = true
          this.oil.hasOwnProperty('key') ? _self.oilNotFinish = false : _self.oilNotFinish = true
          this.oftenFood.hasOwnProperty('key') ? _self.oftenFoodNotFinish = false : _self.oftenFoodNotFinish = true

          return
        }
        let data = {
          uid: localStorage.uid,
          gender: this.sex.key,// 性别
          industry: this.job.key,// 行业
          activity_scale: this.form.map((item) => {return item.key}).join(','), // 活动规模
          medical_care: this.medical.map((item) => {return item.key}).join(','), // 医疗
          education: this.education.map((item) => {return item.key}).join(','), // 教育
          wealth: this.rich.map((item) => {return item.key}).join(','),//财富
          life_happy: this.life.map((item) => {return item.key}).join(','), //娱乐
          other: this.other,//其他

          three_high: this.threeH.map((item) => {return item.key}).join(','),// 三高
          heart_disease: this.hearttype.key, // 心脏疾病
          is_gosh_car: this.carsickness.key,// 晕车
          food_allergy: this.foodallergy.desc || this.foodallergy.value,// 食物过敏
          drug_allergy: this.drugallergy.desc || this.drugallergy.value,// 药物过敏
          other_allergy: this.otherallergy.desc || this.otherallergy.value, // 其他过敏

          is_smoking: this.isSmoke.key,// 是否吸烟 1是
          is_drink: this.isDrink.key,// 是否喝酒 1是
          religious: this.religion.desc || this.religion.value, // 宗教
          salt_habit: this.salt.key,// 盐
          oil_habit: this.oil.key,// 油
          food_habit: this.oftenFood.key,// 常用食物
        }
        this.$ajax.post('/index/user/userperfect', data, {params: {sign: localStorage['sign']}}).then(res => {
          if(res.data.code === 10010){
            _self.toast = true;
            _self.toastMsg = res.data.msg
            return
          }
          _self.$router.push('/profile')
        }, () => {
          _self.toast = true;
          _self.toastMsg = '提交失败'
        })
      },
      stopHide (e) {
        e.stopPropagation()
      },
      hidePop () {
        this.isPopup = false
        this.popChecked = []
        this.popDesc = ''
      },
      openPop (type, checktype) {
        this.isPopup = true
        this.popupOpts = this[type+'Opt']
        this.popupCheckType = checktype
        this.popupKeyType = type
        switch (checktype) {
          case 'radio':
            if(this[type].value != '请选择'){
              this.popChecked = this[type].key
            }
            break;
          case 'checkbox':
            if(this[type][0].value != '请选择'){
              this[type].forEach((item) => {
                this.popChecked.push(item.key)
              })
            }

            break;
        }
      },

      selectItem (index) {
        let _self = this
        //console.log(this.popChecked, this.popupCheckType, this.popupOpts, this.popupKeyType, typeof this.popupCheckType)
        switch (this.popupCheckType) {
          case 'radio':
            this[this.popupKeyType] = this.popupOpts[index]
            break;
          case 'checkbox':
            console.log('checkbox', this.popChecked)
            var arr = [];
            this.popChecked.forEach((item, index) => {
              arr.push(_self.popupOpts[+item - 1])
            })
            console.log('checkbox value',arr)
            if (arr.length === 0)
              this[this.popupKeyType] = [{value: '请选择'}];
            else
              this[this.popupKeyType] = arr;
            break;
        }
        this[this.popupKeyType+'NotFinish'] = false
      },
      handleOther () {
        let _self = this
        if(this.other.length > 0) {
          _self.otherNotFinish = false

        }
      }
    },
    created () {
      this.getFullInfo()
    }
  }
</script>
<style lang="less">
  #info-page {
    min-height: 100vh;
    padding-top: .8rem;
    padding-bottom: .3rem;

    .header {
      background-color: #b4967c;
      font-size: .33rem;
      color: #fff;
      padding: 0;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      .vux-header-title {
        line-height: .8rem;
        height: .8rem;
      }
    }
    .popup {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0,0,0,.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      .optDesc {

      }
      .popup-main {
        width: 5.66rem;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        .mock-ipt {
          text-align: left;
          margin-left: 5px;
        }
        .select-item {
          border-top: 1px solid #e5e5e5;
          color: #989b9f;
          font-size: .24rem;
          text-align: left;
          position: relative;
          label {
            display: block;
            padding: 15px .5rem;
          }
          .checkIcon {
            vertical-align: middle;
            position: absolute;
            right: .42rem;
            top: 50%;
            margin-top: -12px;
            /*display: none;*/
            svg {
              fill: #b4967c;
            }
          }
          input[type='radio'], input[type='checkbox'] {
            visibility: hidden;
            position: absolute;
          }
        }
      }
    }
    .mock-ipt {
      text-align: right;
      border-radius: 50px;
      width: 3.8rem;
      height: .62rem;
      background-color: #f2f1f6;
      border: 1px solid #ebebed;
      padding: 0 10px;
      outline: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    .page-main {
      background-position: 0 0;
      background-color: #f0f0f0;
      background-repeat: no-repeat;
      background-size: contain;
      padding: 0rem .4rem 0;

      .mock-select {
        display: inline-block;
        padding-right: 15px;
        max-width: 3rem;
        span {
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 80px;
        }
        &:after {
          content: " ";
          display: inline-block;
          height: 6px;
          width: 6px;
          border-width: 2px 2px 0 0;
          border-color: #C8C8CD;
          border-style: solid;
          -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: relative;
          top: -2px;
          position: absolute;
          top: 50%;
          right: 15px;
          margin-top: -4px;
        }
      }
      .weui-cells {
      }
      .weui-cell {
        &.more-services {
          background-color: #b6b6b6;
          color: #fff;
          &.openMore {
            .services:after {
              border-width: 0 2px 2px 0;
            }
          }

          .vux-label {
            color: #fff;
          }
          .mock-select:after {
            border-color: #fff;
          }
        }
        &:before {
          left: 0;
        }
        &.title {
          .vux-label {
            color: #2c2e31;
          }
          .weui-cell__ft {
            font-size: .16rem;
            color: #989b9f;
          }
        }
        &.not-finish {
          .mock-select {
            color: red;
          }
          .mock-ipt {
            border-color: red;
          }
        }
        .vux-label, .weui-label {
          font-size: .24rem;
          color: #989b9f;
          width: auto;
          max-width: 3.5rem;
        }
        .weui-cell__ft {
          font-size: .24rem;
          color: #2c2e31;
        }
        .weui-select {
          width: auto;
          direction: rtl;
          font-size: .24rem;
          option {
            direction: ltr;
          }
        }
        &.selector {
          .weui-cell__bd {
            text-align: right;
          }
        }
      }
      .btn-area {
        width: 6.73rem;
        margin: 0 auto;
        background-color: transparent;
        .weui-cells {
          background-color: transparent;
        }
        .member-rights-btn {
          background-color: #b4967c;
          height: .62rem;
          color: #fff;
          border-radius: 50px;
          font-size: .3rem;
          line-height: .62rem;
        }
      }
    }
  }
</style>
