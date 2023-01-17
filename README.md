# Ekzo basic VUE dialog

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[About](#about)

[Futures](#futures)

[Props](#props)

[Emits](#emits)

## About
Simple Vue.js draggable modal dialog component with multiple settings.

## Futures

1. Draggable dialog
1. Hidding controls completely or separetely
1. Predefined dialog themes
1. Automatically open on load

## Props

1. title (string)

    Dialog title 
1. theme  (string)

    Dialog theme. Available values:
    
        1. default (gray theme)(default)
        2. primary (blue theme)
        3. success (green theme)
        4. warning (oragnge theme)
        5. danger  (red theme)
1. okText (string)

    Text of OK button (default: 'OK')
1. cancelText (string)

    Text of Cancel button (default: 'Cancel')
1. enableEsc (Boolean)

    Enable esc key press to close dialog (default: true)
1. showOk (Boolean)

    Show OK button (default: false)
1. cssClasses (String white space seporated)

    Additional css classes for root container (default: '')
1. showClose (Boolean)

    Show Cancel button (default: true)
1. autoShow (Booelan)

    Show dialog on mount (default: false)
1. closeOnClick (Boolean)

    Close dialog on control buttons clicked (default: true)

## Emits

1. dialog:result(value) where value is Boolean

    true - Ok button clicked
    
    false - Cancel button clicked
