import { useEffect, useState } from 'react';
import { useUtilitiesContext } from '../context/UtilitiesProvider'
import { fonts, getFontSizeProperties, soundList, themes } from '../utils/utitlities'
import { FaChevronRight } from "react-icons/fa";
import { FaVolumeDown } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";
import { FaFont } from "react-icons/fa";
import { BiFontFamily } from "react-icons/bi";
import { FaPalette } from "react-icons/fa";
import toast from 'react-hot-toast';

const Settings = () => {

  const { font,
    setFont,
    keySound,
    setKeySound,
    volume,
    setVolume,
    theme: selectedTheme,
    setTheme,
    resetButton,
    setResetButton,
    fontSize,
    setFontSize,
    handleReset } = useUtilitiesContext()

  const [showSound, setShowSound] = useState(true);
  const [showFont, setShowFont] = useState(true);
  const [showTheme, setShowTheme] = useState(true);
  const [showSystem, setShowSystem] = useState(true);

  const [colors, setColors] = useState({
    '--bg-color': "#323437",
    '--main-color': "#e2b714",
    '--text-color': "#d1d0c5",
    '--sub-color': "#646669",
    '--sub-alt-color': "#2c2e31",
    '--error-color': "#ca4754",
    '--caret-color': "#e2b714",
  });
 
  useEffect(() => {

    if (selectedTheme === "custom" && localStorage.getItem('customTheme')) {
      

      const storedTheme = localStorage.getItem('customTheme');
      if (storedTheme) {
        const parsedTheme = JSON.parse(storedTheme);
        setColors(parsedTheme);

        // Apply colors to document root
        Object.keys(parsedTheme).forEach(variableName => {
          document.documentElement.style.setProperty(variableName, parsedTheme[variableName]);
        });
      }
    }
    else {
      const theme = themes.find(t => t.name === selectedTheme);
      if (theme) {
        setColors(theme.colors);
        Object.keys(theme.colors).forEach(variableName => {
          document.documentElement.style.setProperty(variableName, theme.colors[variableName]);
        });
      }
    }

  }, [selectedTheme]);

  const handleColorChange = (variableName, colorValue) => {
    setColors(prevColors => ({ ...prevColors, [variableName]: colorValue }));
    document.documentElement.style.setProperty(variableName, colorValue);
  };

  const handleSoundButton = (sound) => {
    setKeySound(sound.soundFile)
    const audio = new Audio(sound.soundFile)
    audio.play()

  }

  const saveCustom = () => {
    localStorage.setItem("customTheme", JSON.stringify(colors));
    toast.success("custom theme saved")
  }

  const handleFontButtonClick = (size) => {

    setFontSize(getFontSizeProperties(size));
  };

  const buttonStyles = (isSelected) => ({

    backgroundColor: isSelected ? "var(--main-color)" : "var(--sub-alt-color)",
    color: isSelected ? "var(--bg-color)" : "var(--text-color)"
  })

  return (
    <div className='flex flex-col items-center px-2 '>

      <section className='flex items-start justify-center flex-col w-[100%] gap-5 pl-5 lg:pl-10 xl:pl-16 pr-2 my-4 py-5'>

        <nav className='flex gap-4 items-center justify-center w-full'>
          <a href="#sound"><button className='button settings-smallbtn'>Sound</button></a>
          <a href="#font"><button className='button settings-smallbtn'>Font</button></a>
          <a href="#theme"><button className='button settings-smallbtn'>Theme</button></a>
          <a href="#system"><button className='button settings-smallbtn'>System</button></a>
        </nav>

        {/* Sound */}
        <article id='sound' className='flex items-start flex-col w-[100%] '>

          <button className='flex items-center settings-btn gap-3 ' onClick={() => setShowSound(!showSound)}><FaChevronRight className={showSound ? 'rotate-down ' : 'rotate-right '} />
            <span>sound</span>
          </button>

          <div className={`w-[95%] flex flex-col gap-7 toggle-content ${showSound ? 'show' : ""}`}>
            {/* Volume */}
            <div className='flex justify-between sm:flex-row sm:gap-0 gap-2 flex-col'>
              <div className=''>
                <p className='flex gap-2 items-center text-sub'><FaVolumeDown />sound volume</p>
                <p>Change the volume of the sound effects</p>
              </div>

              <div className='flex gap-4'>
                <button style={buttonStyles(volume == 0)} onClick={() => { setVolume(0) }} className='utils-btn '>quiet</button>
                <button style={buttonStyles(volume == 0.6)} onClick={() => { setVolume(0.6) }} className='utils-btn'>medium</button>
                <button style={buttonStyles(volume == 1)} onClick={() => { setVolume(1) }} className='utils-btn'>loud</button>
              </div>
            </div>

            <div>
              <div>

                <p className='flex gap-2 items-center text-sub'> <FaVolumeUp />play sound on click</p>
                <p>Plays a short sound when you press a key</p>
              </div>

              <div className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-3'>
                {soundList.map((sound) => (

                  <button className='utils-btn' style={buttonStyles(keySound === sound.soundFile)} key={sound.name} onClick={() => handleSoundButton(sound)}>
                    {sound.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </article>

        {/* Font */}
        <article id='font' className='w-[100%] '>

          <button className='flex items-center settings-btn gap-3' onClick={() => setShowFont(!showFont)}><FaChevronRight className={showFont ? 'rotate-down' : 'rotate-right'} />font</button>

          <div className={`w-[95%] flex flex-col gap-7  toggle-content ${showFont ? 'show' : ""}`}>

            <div >
              <p className='flex gap-2 items-center text-sub'><BiFontFamily />font style</p>
              <p>Change the style of the font</p>


              <div className='grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-3'>
                {fonts.map((fontobj, index) => (
                  <button className='utils-btn' key={index} style={{ ...fontobj.style, ...buttonStyles(font === fontobj.style.fontFamily) }} onClick={() => { setFont(fontobj.style.fontFamily) }}>
                    {fontobj.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className='flex justify-between gap-2 sm:gap-0 flex-col sm:flex-row'>
              <div >
                <p className='flex gap-2 items-center text-sub'><FaFont />font size</p>
                <p>Change the font size of the test words</p>
              </div>

              <div className='flex gap-4 '>
                <button className='utils-btn'
                  style={{
                    ...buttonStyles(fontSize.size === '1.5rem')
                  }}
                  onClick={() => handleFontButtonClick('small')}
                >
                  small
                </button>
                <button className='utils-btn'
                  style={{
                    ...buttonStyles(fontSize.size === '1.875rem')
                  }}
                  onClick={() => handleFontButtonClick('medium')}
                >
                  medium
                </button>
                <button className='utils-btn collapse sm:visible'
                  style={{
                    ...buttonStyles(fontSize.size === '2.25rem')
                  }}
                  onClick={() => handleFontButtonClick('large')}
                >
                  large
                </button>
              </div>
            </div>
          </div>



        </article>


        {/* Theme */}
        <article className='w-[100%] ' id='theme'>
          <button className='flex items-center settings-btn gap-3' onClick={() => setShowTheme(!showTheme)}><FaChevronRight className={showTheme ? 'rotate-down' : 'rotate-right'} />theme</button>

          <div className={`w-[100%] flex flex-col gap-5  toggle-content px-4  ${showTheme ? 'show pb-[0.4rem]' : ""}`}>
            <div className='flex gap-3'>

              <button className={` utils-btn`} style={buttonStyles(selectedTheme != "custom")} onClick={() => {
                setTheme("serika dark")
              }}>preset</button>
              <button onClick={() => {

                setTheme("custom");
              }} className={` utils-btn `} style={buttonStyles(selectedTheme === "custom")}>custom</button>
            </div>
            {(selectedTheme != "custom") &&
              (
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-3 '>

                  {themes.map((theme) => (
                    <button
                      style={{
                        backgroundColor: theme.colors['--bg-color'],
                        color: theme.colors['--main-color'],
                        outline: selectedTheme === theme.name ? `3.5px solid ${theme.colors['--main-color']}` : 'none',
                        transform: selectedTheme === theme.name ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s, outline 0.3s'
                      }}
                      key={theme.name}
                      className={` flex justify-between items-center theme-btn `}
                      onClick={() => setTheme(theme.name)}
                    >
                      {theme.name}
                      <div className='flex gap-2 theme-color-dots' style={{
                        visibility: selectedTheme === theme.name ? 'visible' : 'hidden',
                        transition: "visibility 0s linear 0.1s, opacity 0.2s",

                      }}>
                        <div className='w-[0.5em] h-[0.5em] sm:w-[1em] sm:h-[1em]  rounded-[100%]' style={{ backgroundColor: theme.colors['--caret-color'] }}></div>
                        <div className='w-[0.5em] h-[0.5em] sm:w-[1em] sm:h-[1em]  rounded-[100%] ' style={{ backgroundColor: theme.colors['--sub-color'] }}></div>
                        <div className='w-[0.5em] h-[0.5em] sm:w-[1em] sm:h-[1em]  rounded-[100%]' style={{ backgroundColor: theme.colors['--text-color'] }}></div>
                      </div>

                    </button>
                  ))}

                </div>
              )}
            {(selectedTheme === "custom") && (
              <>
                <div className='flex items-start  justify-between w-[100%] md:flex-row flex-col md:gap-2 gap-5 lg:pr-[10rem] '>

                    <div className=' flex  md:gap-[8rem] sm:gap-[5rem] gap-[1.5rem] '>
                      
                      <div className='flex flex-col gap-8'>
                        <p >background</p>
                        <p>sub alt</p>
                        <p>main</p>
                        <p>sub</p>
                      </div>

                      <div className='flex flex-col gap-3'>
                        <div className='flex gap-4  justify-center items-start w-[100%] pr-2'>
                          <input className='w-[100%]'
                            type="text"
                            value={colors['--bg-color']}
                            onChange={(e) => handleColorChange('--bg-color', e.target.value)}
                          />

                          <div className='relative rounded-lg w-[42px] h-[32px]' style={{
                            color: 'var(--text-color)',
                            background: 'var(--sub-alt-color)'
                          }} >
                            <FaPalette
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                              }} className='text-[1rem] absolute '
                            />
                            <input
                              type="color"
                              value={colors['--bg-color']}
                              onChange={(e) => handleColorChange('--bg-color', e.target.value)}
                              className='w-full h-full border-none opacity-0 cursor-pointer'
                            />
                          </div>
                        </div>

                        <div className='flex gap-4  justify-center items-center w-[100%] pr-2'>
                          <input className='w-[100%]'
                            value={colors['--sub-alt-color']}
                            onChange={(e) => handleColorChange('--sub-alt-color', e.target.value)}
                          />

                          <div className='relative rounded-lg w-[42px] h-[32px] ' style={{
                            color: 'var(--text-color)',
                            background: 'var(--sub-alt-color)'
                          }} >
                            <FaPalette
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                              }} className='text-[1rem] absolute '
                            />
                            <input
                              type="color"
                              value={colors['--sub-alt-color']}
                              onChange={(e) => handleColorChange('--sub-alt-color', e.target.value)}
                              className='w-full h-full border-none opacity-0 cursor-pointer'
                            />
                          </div>
                        </div>

                        <div className='flex gap-4  justify-center items-center w-[100%] pr-2'>
                          <input className='w-[100%]'
                            type="text"
                            value={colors['--main-color']}
                            onChange={(e) => handleColorChange('--main-color', e.target.value)}
                          />

                          <div className='relative rounded-lg w-[42px] h-[32px]' style={{
                            color: 'var(--bg-color)',
                            background: 'var(--main-color)'
                          }} >
                            <FaPalette
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                              }} className='text-[1rem] absolute '
                            />
                            <input
                              type="color"
                              value={colors['--main-color']}
                              onChange={(e) => handleColorChange('--main-color', e.target.value)}
                              className='w-full h-full border-none opacity-0 cursor-pointer'
                            />
                          </div>
                        </div>

                        <div className='flex gap-4  justify-center items-center w-[100%] pr-2'>
                          <input
                            className='w-[100%]'
                            type="text"
                            value={colors['--sub-color']}
                            onChange={(e) => handleColorChange('--sub-color', e.target.value)}
                          />

                          <div className='relative rounded-lg w-[42px] h-[32px]' style={{
                            color: 'var(--bg-color)',
                            background: 'var(--sub-color)'
                          }} >
                            <FaPalette
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                              }} className='text-[1rem] absolute '
                            />
                            <input
                              type="color"
                              value={colors['--sub-color']}
                              onChange={(e) => handleColorChange('--sub-color', e.target.value)}
                              className='w-full h-full border-none opacity-0 cursor-pointer'
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=' flex md:gap-[8rem] sm:gap-[8rem] gap-[4.5rem] '>

                      <div className='flex flex-col gap-8'>
                        <p>caret</p>
                        <p>text</p>
                        <p>error</p>
                      </div>

                      <div className='flex flex-col gap-3'>
                        <div className='flex gap-4  justify-center items-center w-[100%] pr-2'>
                          <input
                            className='w-[100%]'
                            type="text"
                            value={colors['--caret-color']}
                            onChange={(e) => handleColorChange('--caret-color', e.target.value)}
                          />

                          <div className='relative rounded-lg w-[42px] h-[32px]' style={{
                            color: 'var(--bg-color)',
                            background: 'var(--caret-color)'
                          }} >
                            <FaPalette
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                              }} className='text-[1rem] absolute '
                            />
                            <input
                              type="color"
                              value={colors['--caret-color']}
                              onChange={(e) => handleColorChange('--caret-color', e.target.value)}
                              className='w-full h-full border-none opacity-0 cursor-pointer'
                            />
                          </div>
                        </div>

                        <div className='flex gap-4  justify-center items-center w-[100%] pr-2'>
                          <input
                            className='w-[100%]'
                            type="text"
                            value={colors['--text-color']}
                            onChange={(e) => handleColorChange('--text-color', e.target.value)}
                          />

                          <div className='relative rounded-lg w-[42px] h-[32px]' style={{
                            color: 'var(--bg-color)',
                            background: 'var(--text-color)'
                          }} >
                            <FaPalette
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                              }} className='text-[1rem] absolute '
                            />
                            <input
                              type="color"
                              value={colors['--text-color']}
                              onChange={(e) => handleColorChange('--text-color', e.target.value)}
                              className='w-full h-full border-none opacity-0 cursor-pointer'
                            />
                          </div>
                        </div>


                        <div className='flex gap-4  justify-center items-center w-[100%] pr-2'>
                          <input
                            className='w-[100%]'
                            type="text"
                            value={colors['--error-color']}
                            onChange={(e) => handleColorChange('--error-color', e.target.value)}
                          />

                          <div className='relative rounded-lg w-[42px] h-[32px]' style={{
                            color: 'var(--bg-color)',
                            background: 'var(--error-color)'
                          }} >
                            <FaPalette
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'none',
                              }} className='text-[1rem] absolute '
                            />
                            <input
                              type="color"
                              value={colors['--error-color']}
                              onChange={(e) => handleColorChange('--error-color', e.target.value)}
                              className='w-full h-full border-none opacity-0 cursor-pointer'
                            />
                          </div>
                        </div>

                      </div>
                    </div>


                </div>

                <button className='utils-btn' onClick={() => { saveCustom() }}>save</button>
              </>
            )}

          </div>

        </article>

        {/* System */}
        <article id='system' className='w-[100%]'>
          <button className='flex items-center settings-btn gap-3' onClick={() => setShowSystem(!showSystem)}><FaChevronRight className={showSystem ? 'rotate-down' : 'rotate-right'} />system</button>

          <div className={` w-[95%] flex flex-col gap-2 toggle-content ${showSystem ? 'show' : ""}`}>

            {/* Restart */}
            <div className='flex justify-between '>
              <p>quick restart</p>
              <div className='flex gap-2'>
                <button className=' utils-btn' style={buttonStyles(resetButton === "off")} onClick={() => { setResetButton("off") }}>off</button>
                <button className='utils-btn' style={buttonStyles(resetButton === "Escape")} onClick={() => { setResetButton("Escape") }}>esc</button>
                <button className='utils-btn' style={buttonStyles(resetButton === "Enter")} onClick={() => { setResetButton("Enter") }}>enter</button>
              </div>
            </div>

            {/* Reset */}
            <div>
              <button className='utils-btn' style={buttonStyles(false)} onClick={() => handleReset()}>Reset</button>
            </div>
          </div>



        </article>

      </section>

    </div >
  )
}

export default Settings