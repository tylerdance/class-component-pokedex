import { Component } from 'react';
import Axios from 'axios';

class Pokedex extends Component {
    constructor(){
        super()

        this.state = {
            pokemonName: 'pikachu',
            pokemonImage: '',
        }
    }

    async componentDidMount() {
        const res = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`)
        this.setState({
            pokemonImage: res.data.sprites.front_default
        })
    }
    
    // componentDidMount() {
    //     Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`).then((res) => {
    //         // console.log(res.data.sprites.front_default);
    //         this.setState({
    //             pokemonImage: res.data.sprites.front_default
    //         })
    //     })
    // }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.pokemonName === '') {
            return
        }

        if (prevState.pokemonName === this.state.pokemonName) {
            return;
        }
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`).then((res) => {
            // console.log(res.data.sprites.front_default);
            console.log('successful');
            this.setState({
                pokemonImage: res.data.sprites.front_default
            })
        }).catch(err => {
            console.log('error');
            this.setState({
                pokemonImage: '',
            })
        })
    }

    render() {
        return(
            <div>
                <h1>Pokedex</h1>
                <input value={this.state.pokemonName} onChange={(e) => {this.setState({pokemonName: e.target.value.toLowerCase()})}} />
                <div>
                    <img src={this.state.pokemonImage} alt="" />
                </div>
            </div>
        )
    }
}

export default Pokedex;