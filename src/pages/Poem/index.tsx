import React, { useCallback, useState, useRef } from 'react';
import { trim } from 'lodash';
import { Card, Text, Input, Button, Loading, Row } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';
import { useKeyPress, useRequest } from 'ahooks';
import request from 'utils/request';
import generateUUID from 'utils/generateUUID';
import Styles from './index.less';

const meMessageCss = {
  width: 'auto',
  backgroundColor: '#93d154',
  padding: '10px'
};
const gptMessageCss = { width: 'auto', padding: '10px' };
const messageCardCss = { maxWidth: '80%', marginTop: '20px' };

function Poem() {
  const uuid = useRef(generateUUID());
  const [inputValue, setInputValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const [chatList, setChatList] = useState([
    {
      type: 'gpt',
      message:
        '对诗AI，出上句可以接下句，比如“举头望明月”。另外也可以问“给我一个关于xx的诗”或者“给我一首李白的诗”，得到捏造的诗句。暂时不可以藏头诗。'
    }
  ]);

  const { loading, run: sendMessage } = useRequest(
    async (resend?: string) => {
      let newList;

      if (resend) {
        newList = chatList.map((item) =>
          item.type === 'me' && item.message === resend
            ? { ...item, sending: true, error: false }
            : item
        );
      } else {
        newList = [
          ...chatList,
          {
            type: 'me',
            message: inputValue,
            sending: true,
            error: false
          }
        ];
        setInputValue('');
      }
      setChatList(newList);

      // 加了一条消息渲染后再滚到底部
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      });

      try {
        const data = await request.post('/api/ask_gpt_poem', {
          body: {
            cid: uuid.current,
            msg: resend || inputValue
          }
        });
        newList[newList.length - 1].sending = false;
        setChatList([
          ...newList,
          {
            type: 'gpt',
            message: data.msg
          }
        ]);
      } catch (e) {
        newList[newList.length - 1].sending = false;
        newList[newList.length - 1].error = e || true;
        setChatList(newList);
      }
    },
    {
      manual: true
    }
  );

  const onClickSend = () => {
    sendMessage();
  };

  const onChangeInput = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
  }, []);

  useKeyPress(['enter'], () => {
    if (focused && !loading) {
      sendMessage();
    }
  });

  return (
    <div className={Styles.container}>
      <div className={Styles.chatList}>
        {chatList.map(({ type, message, sending, error }, index) => (
          <div key={index} className={Styles.chatItem}>
            {type === 'me' ? (
              <Row justify="flex-end">
                <Card css={messageCardCss} variant="flat">
                  <Card.Body css={meMessageCss}>
                    <Text size="medium">{message || '82379467'}</Text>
                  </Card.Body>
                  {sending || error ? (
                    <Card.Footer
                      isBlurred
                      css={{
                        bgBlur: '#ffffff66',
                        borderTop:
                          '$borderWeights$light solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <Row justify="flex-end">
                        {error ? (
                          <Text size={18} color="error">
                            {error.message}
                          </Text>
                        ) : null}
                        <Button
                          flat
                          auto
                          rounded
                          size="xs"
                          disabled={sending}
                          color="secondary"
                          onClick={() => {
                            sendMessage(message);
                          }}
                        >
                          <Text
                            css={{ color: 'inherit' }}
                            size={12}
                            weight="bold"
                            transform="uppercase"
                          >
                            {sending ? <Loading size="xs" /> : '重新发送'}
                          </Text>
                        </Button>
                      </Row>
                    </Card.Footer>
                  ) : null}
                </Card>
              </Row>
            ) : (
              <Card css={messageCardCss}>
                <Card.Body css={gptMessageCss}>
                  <ReactMarkdown children={message} />
                </Card.Body>
              </Card>
            )}
          </div>
        ))}
      </div>
      <div className={Styles.chatInputContainer}>
        <Input
          width="100%"
          ref={inputRef}
          animated={false}
          clearable
          bordered
          color="secondary"
          size="xl"
          style={{ color: '#fff' }}
          css={{ backgroundColor: '#051222' }}
          onChange={onChangeInput}
          value={inputValue}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder="请输入上句"
        />
        <Button
          auto
          className={Styles.button}
          disabled={loading || !trim(inputValue)}
          color="gradient"
          onClick={onClickSend}
        >
          {loading ? <Loading color="error" /> : '发 送'}
        </Button>
      </div>
    </div>
  );
}

export default React.memo(Poem);
