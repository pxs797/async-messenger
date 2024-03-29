# async-messenger

🚀 Synchronized communication between windows and iframes

## Installing

### Package manager

Using npm:

```bash
$ npm install @pengxs/asyn-messenger
```

Using yarn:

```bash
$ yarn add @pengxs/async-messenger
```

Using pnpm:

```bash
$ pnpm add @pengxs/async-messenger
```

## Example

parent.html

```html
<html>
<body>
  <iframe id="child" src="child.html" frameborder="0"></iframe>

  <script type="module">

    import asyncMessenger from '@pengxs/async-messenger'

    const child = document.querySelector('#child')
    child.onload = async () => {
      const messenger = asyncMessenger.create({target: child.contentWindow})
      const res = await messenger.post({event: 'say'})
      console.log(res) // Hello World
    }

  </script>

</body>
</html>
```

child.html

```html
<html>
<body>

  <script type="module">

    import asyncMessenger from '@pengxs/async-messenger'

    const messenger = asyncMessenger.create({target: window.parent})
    window.addEventListener('message', async (e) => {
      const { data, channel } = e.data
      if (data.event == 'say') {
        messenger.send({ channel, data: 'Hello World' })
      }
    })

  </script>

</body>
</html>
```

## License

[MIT](./LICENSE) License © 2023 [Mark Peng](https://github.com/pxs797)