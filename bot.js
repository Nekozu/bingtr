const { Bot, InlineKeyboard, session, GrammyError, Context } = require('grammy');

const { translate } = require('bing-translate-api');

const Tesseract = require('tesseract.js');

const bot = new Bot("Your own bot token");

bot.use(session());

bot.command("start", async (ctx) => { // Initialize language if undefined

    const userName = ctx.from.first_name ? ` ${ctx.from.first_name}` : '';

    const startText = `Hii${userName}! 👋 Nice to meet you! I'm Aysbiz Translation. 🌈 I can translate text to any language you want. If you want to know more about how and what, just click the help button below!`;

        const buttonText = 'Select Language';

        const languageButton = [

            { text: buttonText, callback_data: 'select_language' },

            { text: 'Help ℹ️', callback_data: 'command' },

            { text: 'About 📚', url: 'https://t.me/aysbiz' }

        ];

        const inlineKeyboard = new InlineKeyboard().row(...languageButton);

        await ctx.reply(startText, { reply_markup: inlineKeyboard });
});

bot.callbackQuery("balik", async (ctx) => {

  try {

      const userName = ctx.from.first_name ? ` ${ctx.from.first_name}` : '';

      const startText = `Hii${userName}! 👋 Nice to meet you! I'm Aysbiz Translation. 🌈 I can translate text to any language you want. If you want to know more about how and what, just click the help button below!`;

      const buttonText = 'Select Language';

      const languageButton = [

          { text: buttonText, callback_data: 'select_language' },

          { text: 'Help ℹ️', callback_data: 'command' },

          { text: 'About 📚', url: 'https://t.me/aysbiz' }

      ];

      const inlineKeyboard = new InlineKeyboard().row(...languageButton);

      await ctx.editMessageText(startText, { reply_markup: inlineKeyboard });

    } catch (err) {

      if (err instanceof GrammyError) {

        await ctx.answerCallbackQuery('No changes were made.');

        console.error(err);

      } else {

          console.error(err);

          await ctx.api.editMessageText(ctx.chat.id, ctx.callbackQuery.message.message_id, 'An error occurred. Please try again.');

      }

    }

    return;

  });

  

bot.callbackQuery('select_language', async (ctx) => {

  try {

      if (ctx.chat.type !== 'private') {

          return;

      }

    const inlineKeyboard = new InlineKeyboard();

    const languages = [

      { name: 'Afrikaans', code: 'af' },

      { name: 'Albanian', code: 'sq' },

      { name: 'Arabic', code: 'ar' },

      { name: 'Armenian', code: 'hy' },

      { name: 'Azerbaijani', code: 'az' },

      { name: 'Bosnian', code: 'bs' },

      { name: 'Bulgarian', code: 'bg' },

      { name: 'Cantonese (Traditional)', code: 'yue' },

      { name: 'Catalan', code: 'ca' },

      { name: 'Chinese (Literary)', code: 'lzh' },

      { name: 'Croatian', code: 'hr' },

      { name: 'Czech', code: 'cs' },

      { name: 'Dutch', code: 'nl' },

      { name: 'English', code: 'en' },

      { name: 'Estonian', code: 'et' },

      { name: 'Filipino', code: 'fil' },

      { name: 'French', code: 'fr' },

      { name: 'Georgian', code: 'ka' },

      { name: 'German', code: 'de' },

      { name: 'Greek', code: 'el' },

      { name: 'Gujarati', code: 'gu' },

      { name: 'Haitian Creole', code: 'ht' },

      { name: 'Hebrew', code: 'he' },

      { name: 'Hindi', code: 'hi' },

      { name: 'Hmong Daw', code: 'mww' },

      { name: 'Hungarian', code: 'hu' },

      { name: 'Icelandic', code: 'is' },

      { name: 'Indonesian', code: 'id' },

      { name: 'Italian', code: 'it' },

      { name: 'Japanese', code: 'ja' },

      { name: 'Kannada', code: 'kn' },

      { name: 'Kashmiri', code: 'ks' },

      { name: 'Kazakh', code: 'kk' },

      { name: 'Khmer', code: 'km' },

      { name: 'Korean', code: 'ko' },

      { name: 'Kurdish (Central)', code: 'ku' },

      { name: 'Kyrgyz', code: 'ky' },

      { name: 'Lao', code: 'lo' },

      { name: 'Latvian', code: 'lv' },

      { name: 'Lithuanian', code: 'lt' },

      { name: 'Malay', code: 'ms' },

      { name: 'Malayalam', code: 'ml' },

      { name: 'Myanmar (Burmese)', code: 'my' },

      { name: 'Nepali', code: 'ne' },

      { name: 'Norwegian', code: 'nb' },

      { name: 'Persian', code: 'fa' },

      { name: 'Polish', code: 'pl' },

      { name: 'Portuguese (Brazil)', code: 'pt' },

      { name: 'Portuguese (Portugal)', code: 'pt-PT' },

      { name: 'Punjabi', code: 'pa' },

      { name: 'Romanian', code: 'ro' },

      { name: 'Russian', code: 'ru' },

      { name: 'Slovak', code: 'sk' },

      { name: 'Slovenian', code: 'sl' },

      { name: 'Somali', code: 'so' },

      { name: 'Spanish', code: 'es' },

      { name: 'Tamil', code: 'ta' },

      { name: 'Tatar', code: 'tt' },

      { name: 'Thai', code: 'th' },

      { name: 'Tibetan', code: 'bo' },

      { name: 'Turkish', code: 'tr' },

      { name: 'Ukrainian', code: 'uk' },

      { name: 'Urdu', code: 'ur' },

      { name: 'Uyghur', code: 'ug' },

      { name: 'Uzbek (Latin)', code: 'uz' },

      { name: 'Vietnamese', code: 'vi' },

    ];    

  

    let rowButtons = [];

    languages.forEach((language, index) => {

      const languageButton = { text: language.name, callback_data: `language_${language.code}` };

      rowButtons.push(languageButton);

      if (rowButtons.length === 5 || index === languages.length - 1) {

        inlineKeyboard.row(...rowButtons);

        rowButtons = [];  // Reset the rowButtons for the next row

      }

    });

    await ctx.answerCallbackQuery('Making inline button....');

    await ctx.editMessageText('Choose Your Preferred Language 🌐:', { reply_markup: inlineKeyboard });

  } catch (err) {

    if (err instanceof GrammyError) {

      await ctx.answerCallbackQuery('No changes were made.');

      console.error(err);

    } else {

        console.error(err);

        await ctx.api.editMessageText(ctx.chat.id, ctx.callbackQuery.message.message_id, 'An error occurred. Please try again.');

    }

  }

  return;

});

bot.command('language', async (ctx) => {

if (ctx.chat.type !== 'private') {

        return;

   }

   const inlineKeyboard = new InlineKeyboard();

   const languages = [

    { name: 'Afrikaans', code: 'af' },

    { name: 'Albanian', code: 'sq' },

    { name: 'Arabic', code: 'ar' },

    { name: 'Armenian', code: 'hy' },

    { name: 'Azerbaijani', code: 'az' },

    { name: 'Bosnian', code: 'bs' },

    { name: 'Bulgarian', code: 'bg' },

    { name: 'Cantonese (Traditional)', code: 'yue' },

    { name: 'Catalan', code: 'ca' },

    { name: 'Chinese (Literary)', code: 'lzh' },

    { name: 'Croatian', code: 'hr' },

    { name: 'Czech', code: 'cs' },

    { name: 'Dutch', code: 'nl' },

    { name: 'English', code: 'en' },

    { name: 'Estonian', code: 'et' },

    { name: 'Filipino', code: 'fil' },

    { name: 'French', code: 'fr' },

    { name: 'Georgian', code: 'ka' },

    { name: 'German', code: 'de' },

    { name: 'Greek', code: 'el' },

    { name: 'Gujarati', code: 'gu' },

    { name: 'Haitian Creole', code: 'ht' },

    { name: 'Hebrew', code: 'he' },

    { name: 'Hindi', code: 'hi' },

    { name: 'Hmong Daw', code: 'mww' },

    { name: 'Hungarian', code: 'hu' },

    { name: 'Icelandic', code: 'is' },

    { name: 'Indonesian', code: 'id' },

    { name: 'Italian', code: 'it' },

    { name: 'Japanese', code: 'ja' },

    { name: 'Kannada', code: 'kn' },

    { name: 'Kashmiri', code: 'ks' },

    { name: 'Kazakh', code: 'kk' },

    { name: 'Khmer', code: 'km' },

    { name: 'Korean', code: 'ko' },

    { name: 'Kurdish (Central)', code: 'ku' },

    { name: 'Kyrgyz', code: 'ky' },

    { name: 'Lao', code: 'lo' },

    { name: 'Latvian', code: 'lv' },

    { name: 'Lithuanian', code: 'lt' },

    { name: 'Malay', code: 'ms' },

    { name: 'Malayalam', code: 'ml' },

    { name: 'Myanmar (Burmese)', code: 'my' },

    { name: 'Nepali', code: 'ne' },

    { name: 'Norwegian', code: 'nb' },

    { name: 'Persian', code: 'fa' },

    { name: 'Polish', code: 'pl' },

    { name: 'Portuguese (Brazil)', code: 'pt' },

    { name: 'Portuguese (Portugal)', code: 'pt-PT' },

    { name: 'Punjabi', code: 'pa' },

    { name: 'Romanian', code: 'ro' },

    { name: 'Russian', code: 'ru' },

    { name: 'Slovak', code: 'sk' },

    { name: 'Slovenian', code: 'sl' },

    { name: 'Somali', code: 'so' },

    { name: 'Spanish', code: 'es' },

    { name: 'Tamil', code: 'ta' },

    { name: 'Tatar', code: 'tt' },

    { name: 'Thai', code: 'th' },

    { name: 'Tibetan', code: 'bo' },

    { name: 'Turkish', code: 'tr' },

    { name: 'Ukrainian', code: 'uk' },

    { name: 'Urdu', code: 'ur' },

    { name: 'Uyghur', code: 'ug' },

    { name: 'Uzbek (Latin)', code: 'uz' },

    { name: 'Vietnamese', code: 'vi' },

  ];    

 

   let rowButtons = [];

   languages.forEach((language, index) => {

     const languageButton = { text: language.name, callback_data: `language_${language.code}` };

     rowButtons.push(languageButton);

     if (rowButtons.length === 5 || index === languages.length - 1) {

       inlineKeyboard.row(...rowButtons);

       rowButtons = [];

     }

   });

  await ctx.reply('Choose Your Preferred Language 🌐:', { reply_markup: inlineKeyboard });

});



bot.command('help', async (ctx) => {

    const commandInfoText = `

🚀 *Aysbiz Translation Bot - Command Guide* 🚀



🔍 *Translation Commands:*

- You can only just send the message you want to translate at here!



🌐 *Language Commands:*

- Change your preferred language with the /language command.

- Select the language you want by clicking the "Select Language" button.



🔄 *Other Commands:*

- /start: Get started and choose your language.

- /help: Display this command guide.

- /language: Select your preferred language.



🔗 *Links:*

- [Nekozu Channel](https://t.me/nekozuX)

`;



    await ctx.answerCallbackQuery('Wait...');

    const buttonText = 'Select Language';

    const languageButton = [

        { text: buttonText, callback_data: 'select_language' },

        { text: 'Back', callback_data: 'balik' },

        { text: 'About 📚', url: 'https://t.me/nekozuX' }

    ];

    const inlineKeyboard = new InlineKeyboard().row(...languageButton);

    await ctx.editMessageText(commandInfoText, { parse_mode: 'Markdown', reply_markup: inlineKeyboard });

});

bot.callbackQuery('command', async (ctx) => {

  try {

    const commandInfoText = `

🚀 *Aysbiz Translation Bot - Command Guide* 🚀



🔍 *Translation Commands:*

- You can only just send the message you want to translate at here!



🌐 *Language Commands:*

- Change your preferred language with the /language command.

- Select the language you want by clicking the "Select Language" button.



🔄 *Other Commands:*

- /start: Get started and choose your language.

- /help: Display this command guide.

- /language: Select your preferred language.



🔗 *Links:*

- [Nekozu Channel](https://t.me/nekozuX)

`;



   await ctx.answerCallbackQuery('Wait...');

   const buttonText = 'Select Language';

   const languageButton = [

    { text: buttonText, callback_data: 'select_language' },

    { text: 'Back', callback_data: 'balik' },

    { text: 'About 📚', url: 'https://t.me/aysbiz' }

    ];

    const inlineKeyboard = new InlineKeyboard().row(...languageButton);

    await ctx.editMessageText(commandInfoText, { parse_mode: 'Markdown', reply_markup: inlineKeyboard });

  } catch (err) {

    if (err instanceof GrammyError) {

      await ctx.answerCallbackQuery('No changes were made.');

      console.error(err);

    } else {

        console.error(err);

        await ctx.api.editMessageText(ctx.chat.id, ctx.callbackQuery.message.message_id, 'An error occurred. Please try again.');

    }

  }

  return;

});

bot.callbackQuery(/language_(\w+)/, async (ctx) => {

 try{

  ctx.session = ctx.session || {};

  ctx.session.language = ctx.match[1] || '';



  if (ctx.session.language) {

    const infoText = 'Your selected language is: ' + ctx.session.language;

    await ctx.answerCallbackQuery('Language changed.');

    await ctx.editMessageText(infoText);

  }

} catch (err) {

  if (err instanceof GrammyError) {

    await ctx.answerCallbackQuery('No changes were made.');

    console.error(err);

  } else {

      console.error(err);

      await ctx.api.editMessageText(ctx.chat.id, ctx.callbackQuery.message.message_id, 'An error occurred. Please try again.');

  }

}

return;

});

bot.on('message:text', async (ctx) => {

  if (ctx.chat.type === 'private') {

    ctx.session = ctx.session || {};

    ctx.session.language = ctx.session.language || '';



    if (!ctx.session.language) {

      const text = 'Please select a language first.';

      await ctx.reply(text);

      return;

    }



    const textToTranslate = ctx.message.text;

    try {

      const translatedText = await translate(textToTranslate, null, ctx.session.language);

      const buttonText = 'Select Language';

      const languageButton = [

        { text: buttonText, callback_data: 'select_language' },

        { text: 'Channel 📚', url: 'https://t.me/nekozuX' }

      ];

      const inlineKeyboard = new InlineKeyboard().row(...languageButton);

      await ctx.reply('Translation: ' + translatedText.translation, {reply_markup: inlineKeyboard});

    } catch (error) {

      console.error('Translation error:', error);

      await ctx.reply('Error in translation. Please try again.');

    }

  } else if(ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {

    if(ctx.message.text.startsWith('/tr')) {

      const splitText = ctx.message.text.split(' ');

      if(splitText.length < 2) {

        await ctx.reply('Please provide a language code. Usage: /tr (language code) (text)');

        return;

      }

      const languageCode = splitText[1];

      let textToTranslate;

      let replyTextToTranslate;

      if(ctx.message.reply_to_message && ctx.message.reply_to_message.text) {

        replyTextToTranslate = ctx.message.reply_to_message.text;

      } else if(splitText.length >= 3) {

        textToTranslate = splitText.slice(2).join(' ');

      } else {

        await ctx.reply('Please provide a text to translate. Usage: /tr (language code) (text)');

        return;

      }

      try {

        let translatedText;

        if(replyTextToTranslate) {

          translatedText = await translate(replyTextToTranslate, null, languageCode);

        } else {

          translatedText = await translate(textToTranslate, null, languageCode);

        }

        button = [{ text: 'Try at PM', url: 'https://t.me/nekotrqrbot' }];

        await ctx.reply('Translation: ' + translatedText.translation, {reply_markup: {inline_keyboard: [button]}});

      } catch (error) {

        console.error('Translation error:', error);

        await ctx.reply('Error in translation. Please try again.');

      }

    }

  }

});



bot.on('message:photo', async (ctx) => {

  try {

    if(ctx.chat.type === 'private') {

      ctx.session = ctx.session || {};

      ctx.session.language = ctx.session.language || '';

      if (!ctx.session.language) {

        const text = 'Please select a language first.';

        await ctx.reply(text, {reply_markup: {inline_keyboard: [[{ text: 'Select Language', callback_data: 'select_language' }]]}});

        return;

      }

      const photoId = ctx.message.photo[ctx.message.photo.length - 1].file_id;

      const file = await ctx.api.getFile(photoId);

      if (file.file_size > 15 * 1024 * 1024) {

        await ctx.reply('The file size is too large. Please send a photo that is not more than 15 MB.');

        return;

      }

      const url = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;



      const { data: { text } } = await Tesseract.recognize(url);

      ctx.session.text = text;

      await ctx.reply(text, {reply_markup: {inline_keyboard: [[{ text: 'Translate It?', callback_data: 'translate' }]]}});

    }

  } catch (error) {

    console.error(error);

    await ctx.reply('An error occurred. Please try again.');

  }

});



bot.callbackQuery('translate', async (ctx) => {

  try {

    await ctx.api.editMessageText(ctx.chat.id, ctx.callbackQuery.message.message_id, 'Please wait...');

    const text = ctx.session.text;

    const translated = await translate(text, null, ctx.session.language);

    await ctx.api.editMessageText(ctx.chat.id, ctx.callbackQuery.message.message_id, translated.translation, {reply_markup: {inline_keyboard: [[{ text: 'Dont forget to subscribe!', url: 'https://t.me/nekozuX' }]]}});

  } catch (err) {

    if (err instanceof GrammyError) {

      await ctx.answerCallbackQuery('No changes were made.');

      console.error(err);

    } else {

        console.error(err);

        await ctx.api.editMessageText(ctx.chat.id, ctx.callbackQuery.message.message_id, 'An error occurred. Please try again.');

    }

  }

  return;

});



bot.start();

console.log('Bot is running...\n Dont forget to stars me! https://github.com/nekozu/bingtr');

bot.catch(console.error);
