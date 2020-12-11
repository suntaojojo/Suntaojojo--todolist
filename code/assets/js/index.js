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
  let count1 = 0
  let count2 = 0
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

  //实时改变框中的内容
  $('#todolist').on('click' , 'li  > p' , function(){
    // console.log('点解了')
    $(this).after($('<input type="text" class="p2" style="">'))
    // console.log($(this).html())
    // console.log($(this).prev('.p1'))
    var p = $(this)
    $(this).css('display','none')
    $(this).next('.p2').css({
      width:$(this).width(),
      position:'absolute',
      left:$(this).css('left')
    })
    // console.log($('.p2').val())
    var id = $(this).data('id')
    // console.log(id , data[id])
    $('#todolist').on('keydown' , '.p2' , function(e){
      e = e || window.event
      var code = e.keyCode || e.which
      if(code === 13){
        // console.log($(this).val())
        const input = $(this)
        console.log(input)
        console.log(p)
        data[id] = $(this).val()
        console.log(p , id)
        p.css('display' , 'block')
        window.localStorage.setItem('data' , JSON.stringify(data))
        bindHTML()
        // input.css('display' , 'none')
      }
      console.log(data)
      
    })
    
    // bindHTML()
  })
  
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
      count2++
    }
    $('#donecount').html(complete.length)
    $('#donelist').html(str)
  }



})