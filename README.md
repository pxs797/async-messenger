# async-postMessage

🚀 Asynchronous iframe communication based on postMessage

## Sample usage

### parent.html

```html
<html>
<body>
  <iframe id="child" src="child.html" frameborder="0"></iframe>

  <script type="module">

    import MessageWrapper from 'src/index.js'

    const child = document.querySelector('#child')
    child.onload = async () => {
      
      console.log('===== child on ready =====')
      
      const messageWrapper = new MessageWrapper(child.contentWindow)
      const res = await messageWrapper.post({event: 'say'})
      console.log('from child: ', res)

    }

  </script>

</body>
</html>
```

### child.html

```html
<html>
<body>

  <script type="module">

    import MessageWrapper from 'src/index.js'

    const messageWrapper = new MessageWrapper(window.parent)
    window.addEventListener('message', async (e) => {
      const { event, channel } = e.data
      if (event == 'say') {
        messageWrapper.send({ channel, data: 'Hello World' })
      }
    })

  </script>

</body>
</html>
```

## License

[MIT](./LICENSE) License © 2023 [Mark Peng](https://github.com/pxs797)