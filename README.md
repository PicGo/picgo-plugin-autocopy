## picgo-plugin-autocopy

A [picgo](https://github.com/PicGo/PicGo-Core) plugin for auto copying url to clipboard after uploading.

> CLI Only.

![](https://raw.githubusercontent.com/Molunerfinn/test/master/picgo/picgo-plugin-autocopy.gif)

**It's useless for the electron version of [PicGo](https://github.com/Molunerfinn/PicGo) since it already has this feature. It's useful when you are using picgo in CLI.**

## Installation

```bash
picgo install autocopy
```

## Configuration

`picgo-plugin-autocopy` supports 5 kinds of url types:

- markdown
- URL (default)
- HTML
- UBB
- Custom

To change the default type of url, please run:

```bash
picgo set plugin autocopy
```

**Custom** means you can create your own types of url for copying. Just place the `$url` to your own string.

For example:

```
<a href="$url"><img src="$url"></a>
```

And it will be coverted to:

```
<a href="https://xxx.jpg"><img src="https://xxx.jpg"></a>
```

