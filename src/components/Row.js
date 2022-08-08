const Row = ({guess , currentGuess}) => {
    if (guess) {
        return (
          <div className="row past">
            {guess.map((l, i) => (
              <div key={i} className={l.color}>{l.key}</div>
            ))}
          </div>
        )
    }

    if(currentGuess) {
        let letters = currentGuess.split('');
        return (
            <div className="row current">
                {
                    letters.map((letter,i)=>{
                        return <div key={i} className="filled">{letter}</div>
                    })
                }
                {
                    [...Array(5- letters.length)].map((_, index)=>{
                        return <div key={index}></div>
                    })
                }
            </div>
        )
    }
    return ( 
        <div className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
     );
}
 
export default Row;