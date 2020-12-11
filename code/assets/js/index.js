/**
 * 
 * @authors cherish yii2 (cherish@cherish.pw)
 * @date    2020-12-10 16:48:28
 * @version v1.0
 * @description the core js of todolist project
 * 
 * ━━━━━━神兽出没━━━━━━
 * 　　   ┏┓　 ┏┓
 * 　┏━━━━┛┻━━━┛┻━━━┓
 * 　┃              ┃
 * 　┃       ━　    ┃
 * 　┃　  ┳┛ 　┗┳   ┃
 * 　┃              ┃
 * 　┃       ┻　    ┃
 * 　┃              ┃
 * 　┗━━━┓      ┏━━━┛ Code is far away from bugs with the animal protecting.
 *       ┃      ┃     神兽保佑,代码无bug。
 *       ┃      ┃
 *       ┃      ┗━━━┓
 *       ┃      　　┣┓
 *       ┃      　　┏┛
 *       ┗━┓┓┏━━┳┓┏━┛
 *     　  ┃┫┫　┃┫┫
 *     　  ┗┻┛　┗┻┛
 *
 * ━━━━━━感觉萌萌哒━━━━━━
 */

// 请根据考试说明文档中列出的需求进行作答
// 预祝各位顺利通过本次考试，see you next week！
// ...
$(function(){
//我们创建一个数组
  var data = JSON.parse(window.localStorage.getItem('data')) || []
  var complete = JSON.parse(window.localStorage.getItem('com')) || []

  console.log(data , complete)
//设置一个鼠标按下的事件
  bindHTML()
  Success()



  $("form  input").on('keydown' , function(e){
    const value = this.value.trim()
    if (!value) return
    var code = e.keyCode || e.which
    console.log(code)
    if(code == 13){
      data.push( $('form input').val())
      $('form input').val('')
      console.log(data)
      window.localStorage.setItem('data' , JSON.stringify(data))
      bindHTML()
      Success()
    }
  })
  
 


  console.log($('#todolist'))
  $('#todolist').on('click' , 'li input' , function(){
    console.log('点击了')
    const  flag = this.checked
    const id = $(this).data('id')
    console.log(flag , id)
    if(flag){
      complete.push(data[id])
      data.splice(id , 1)
      console.log(data , complete)
      window.localStorage.setItem('data' , JSON.stringify(data))
      window.localStorage.setItem('com' ,JSON.stringify(complete) )
      bindHTML()
      Success()
    }
  })

  //点击待办事项的按钮就回被删除
  $('#todolist').on('click' , 'li  > a' , function(){
    console.log('点解了')
    console.log($(this).data('id'))
    const id = $(this).data('id')
    data.splice(id , 1)
    window.localStorage.setItem('data' , JSON.stringify('data' , data))
    bindHTML()
  })


  $('#donelist').on('click' , 'li > input' , function(){
    console.log(123)
    const flag = this.checked
    const id = $(this).data('id') 
    console.log(id)
    console.log(flag)
    if(!flag){
      data.push(complete[id])
      complete.splice(id , 1)
      console.log(complete , data)
    }
    window.localStorage.setItem('data' , JSON.stringify(data))
    window.localStorage.setItem('com' , JSON.stringify(complete))
    bindHTML()
    Success()
  })


  //正在进行的待办事项点击后就会删除
  $('#donelist').on('click' , 'li > a' , function(){
    console.log(123)
    console.log($(this).data('id'))
    const id = $(this).data('id')
    complete.splice(id , 1)
    window.localStorage.setItem('complete' , JSON.stringify(complete))
    Success()
  })



  let ids 
  //实时改变框中的内容
  $('#todolist').on('click' , 'li  > p' , function(e){
    e.stopPropagation()
    console.log('鼠标按下的事件clickclickclickclickclickclickclickclick')
    $(this).after($('<input type="text" class="p2" style="" autofocus="autofocus">'))//这里就在li的最后面添加一个input标签
    $(this).next('.p2').css({
      width:$(this).width(),
      position:'absolute',
      left:$(this).css('left')
    }) //让点击后添加的input的定位定再p的位置上
    let id = $(this).data('id') //这里获取点击p上的数组中的那个位置
    console.log($(this))
    ids = id
    console.log(id , '222222222222222222222222222222')
    // console.log(id , data[id])
    /////////////////键盘点击事件///////////////////
    $('#todolist').on('keydown' , 'li .p2' , function(e){
      console.log('键盘按下事件keydownkeydownkeydownkeydownkeydownkeydownkeydown')
      //这里我们添加一个点击事件  键盘按下的时候就会被触发
      e = e || window.event
      var code = e.keyCode || e.which
      if(code == 13){//如果我们按下回车按钮的时候
        console.log('按下回车-----------------------------------------------------------------')
        data[id] = $(this).val() //这里时改变window数组中的数值
        console.log('这是id'  , id )
        console.log('这是ids' ,  ids ) //
        window.localStorage.setItem('data' , JSON.stringify(data))
        bindHTML()
        console.log('按下回车键结束----------------------------------------------------------------')
      }
      console.log(data)
      //键盘按下事件结束
      console.log('按下键盘结束keydownkeydownkeydownkeydownkeydownkeydownkeydownkeydown')
      
    })
    ////////////////////////////////////
    console.log('结束点击事件clickclickclickclickclickclickclickclick')
    // bindHTML()
  })
  //这里我一直再想一个问题  为什么把我   键盘按下 的事件放再里面的时候  第一次可以改变对应点击的值
  //然而第二次为什么我改变不了
  //主要原因:由于点击第二次input的时候 实际触发点击事件的时  上面触发input的点击事件
  //由于作用域的问题 ,他是一个私有作用域 且 全局作用域中还没有这个值,他一直存储的值就是上次点击的 id 值
  //这里 还有一个问题就是 为什么 第二次 没有先赋值给 id=2 主要因为如下
  //第一次点击  p 的点击事件   键盘按下的事件并没有触发  我们需要再点击一次input才回触发焦点
  // 再次点击的时候 我们就要先执行键盘按下  事件  再执行 第一次点击 p 的点击事件 的  键盘按下事件  所以会有两次点击事件
  
   //这个是渲染代办事件的地方
   function bindHTML(){
    let str = ``
    for(let i = 0 ; i < data.length ; i++){
      str +=  `
      <li id="todolist1">
          <input type="checkbox" data-id=${i} class="p1" />
          <p class="context" onclick="" data-id=${i}>${data[i]}</p>
          <a data-id=${i}>-</a>
      </li>
      `
      
    }
    $('#todocount').html(data.length)
    $('#todolist').html(str)
  }
  //这个是渲染已经完成事件的地方
  function Success(){
    let str = ``
    for(let i = 0 ; i < complete.length ;i++){
      str += `
      <li>
          <input type="checkbox" checked="checked" data-id = ${i}>
          <p onclick="">${complete[i]}</p>
          <a data-id="${i}">-</a>
      </li>
      `
    }
    $('#donecount').html(complete.length)
    $('#donelist').html(str)
  }



})