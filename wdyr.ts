import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';


if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true, // отслеживать все PureComponent и memo
    trackHooks: true,             // анализировать изменения хуков
    logOnDifferentValues: false,  // логировать только если значения совпадают
  });
}
console.log('WDYR is running in:', process.env.NODE_ENV);//выводит в консоль, что WDYR работает в режиме разработки
