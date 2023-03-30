import { StyleSheet, View, Text, ScrollView, Switch, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { API } from "../../services/api";


export default function Terms({ navigation, route }) {

    const { users, address, billing_day } = route.params
    console.log(users, address, billing_day)

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState)

    function navigateForPaymentDay() {
        navigation.goBack()
    }

    function addRegistration() {
        fetch(API + '/users', {
            body: JSON.stringify({
                fullname: users.fullname,
                contact: users.contact,
                email: users.email,
                number_rg: users.number_rg,
                cpf: users.cpf,
                password: users.password,
                "address": {
                    cep: address.cep,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    region: address.region,
                    number: address.number,
                    complement: address.complement
                },
                "billing_day": billing_day
            }),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(() => {
                if (isEnabled === true) {
                    alert('Usuário cadastrado com sucesso')
                    navigation.navigate('Login')
                } else {
                    alert('Aceite os termos para se cadastrar')
                }

            })
            .catch(() => alert('Houve um erro ao tentar cadastrar o usuário'))

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Termos e Condições de Uso</Text>
            <ScrollView>
                <Text style={styles.term}>
                    Seja bem-vindo ao Pay Pagamentos!
                    Estes termos e condições descrevem as regras de uso do site da empresa Pay pagamentos, localizado no endereço https://site.paypagamentos.rsr.

                    Ao acessar este site, consideramos que você está de acordo com os termos e condições abaixo. Não continue a usar o Pay Pagamentos caso você discorde dos termos e condições descritos neste contrato.

                    Cookies:
                    O site usa cookies para ajudar na personalização da sua experiência na internet. Ao acessar o site Pay Pagamentos, você concorda com o uso dos cookies requeridos.

                    Cookies são arquivos de texto inseridos no seu disco rígido por um servidor de página web. Os cookies não têm permissão para executar programas ou transferir vírus para seu computador. Os cookies são associados exclusivamente a você e só podem ser lidos pelo servidor web do domínio que emitiu o cookie.

                    Nós podemos usar cookies para coletar, armazenar ou rastrear informações para finalidades estatísticas e mercadológicas do nosso site. Você tem a opção de aceitar ou rejeitar os cookies opcionais. Existem alguns cookies obrigatórios, que são necessários para o funcionamento de nosso site. Esses cookies obrigatórios são requerem seu consentimento. Por favor, tenha em mente que, ao aceitar os cookies obrigatórios, você também estará aceitando cookies de terceiros, que podem ser usados por terceiros caso você utilize serviços fornecidos por eles em nosso site – por exemplo, uma janela de reprodução de vídeo fornecida por empresas terceiras e integrada ao nosso site.
                </Text>
                <Text style={styles.term}>
                    Licença:
                    Exceto em casos em que for indicado o contrário, Pay pagamentos e seus licenciados têm direito à propriedade intelectual de todo o material postado no Pay Pagamentos. Todos os direitos à propriedade intelectual são reservados.

                    Você não tem permissão para:

                    Copiar ou republicar materiais do Pay Pagamentos
                    Vender, alugar ou sublocar materiais do Pay Pagamentos
                    Reproduzir, duplicar ou copiar materiais do Pay Pagamentos
                    Redistribuir conteúdos do Pay Pagamentos
                    Este Acordo terá efeito a partir da data presente.

                    Partes deste site oferecem ao usuário a oportunidade de postar e discutir opiniões e informações em determinadas áreas. Pay pagamentos não filtra, edita, publica ou revisa Comentários antes que eles sejam apresentados no site. Comentários refletem as opiniões da pessoa que os posta. Na extensão em que as leis aplicáveis permitem, Pay pagamentos não se responsabiliza legalmente pelos Comentários ou quaisquer danos, riscos ou despesas causadas ou sofridas como resultado do uso, e/ou postagem e/ou aparência dos Comentários deste site.

                    Pay pagamentos reserva para si o direito de remover quaisquer Comentários que possam ser considerados inapropriados, ofensivos ou quebrem os Termos e Condições deste contrato.
                </Text>
                <Text style={styles.term}>
                    Você declara e garante que:

                    Você tem o direito de postar Comentários em nosso site e tem todas as licenças e consentimentos para tal;
                    Seus Comentários não invadem qualquer propriedade intelectual, incluindo direitos autorais, patentes ou marcas registradas de terceiros;
                    Seus Comentários não contém material difamatório, injurioso, ofensivo, indecente ou de alguma forma ilícito, que é invasão de privacidade.
                    Seus Comentários não serão usados para solicitar ou promover negócios ou apresentar atividades comerciais ou atividades ilícitas.
                    Você por meio deste concede a Pay pagamentos a licença não-exclusiva de usar, reproduzir, editar e autorizar outros a usar, reproduzir ou editar qualquer um de seus Comentários em qualquer e todas as formas, formatos e mídias.

                    Criação de links para nosso conteúdo
                    As seguintes organizações podem criar links para nosso Site sem a necessidade de aprovação prévia por escrito:

                    Agências governamentais;
                    Mecanismos de busca;
                    Organizações de mídia;
                    Distribuidores de diretórios online podem inserir links para nosso Site na mesma maneira que inserem hiperlinks para Sites de outras empresas listadas; e
                    Empresas credenciadas, exceto organizações angariantes sem fins lucrativos e grupos de arrecadação de fundos para instituições de caridade, que não podem inserir links para nosso Site sem aprovação prévia.
                    Essas organizações podem postar links para nossa página inicial, nossas publicações ou outras informações do Site, contanto que o link: (a) não seja, de forma alguma, enganoso; (b) não insinue falsamente a existência de uma relação de patrocínio, endosso, ou aprovação nossa a produtos e/ou serviços; e (c) seja apropriado ao contexto em que está sendo inserido.

                    Nós podemos considerar e aprovar solicitações de link feitas pelos seguintes tipos de organizações:

                    fontes de informação bem conhecidas sobre produtos e negócios;
                    sites comunitários ponto.com;
                    associações e outros grupos que representem instituições de caridade;
                    distribuidores de diretórios online;
                    portais de internet;
                    firmas de contabilidade, advocacia e consultoria; e
                    instituições educacionais e associações de classe.
                </Text>
                <Text style={styles.term}>
                    Nós vamos aprovar solicitações de link feitas pelos tipos de organização listados acima se julgarmos que: (a) o link não é desfavorável para nossa imagem e/ou para a imagem de empresas credenciadas; (b) a organização solicitante não possui histórico negativo conosco; (c) o benefício que ganhamos com a visibilidade do link compensa a ausência do Pay pagamentos; e (d) o link será inserido em um contexto geral informativo.

                    Essas organizações podem postar links para nossa página inicial contanto que o link: (a) não seja, de forma alguma, enganoso; (b) não insinue falsamente a existência de uma relação de patrocínio, endosso, ou aprovação de produtos e/ou serviços da nossa parte; e (c) seja apropriado ao contexto em que está sendo inserido.

                    Se você representa uma das organizações listadas no parágrafo 2 acima e está interessado em postar um link para nosso site, você deve nos informar de seu interesse enviando um e-mail para Pay pagamentos. Por favor, inclua seu some, o nome da sua organização e suas informações de contato, assim como a URL do seu site, uma lista das URLs do nosso site que você pretende usar como links, e uma lista dos sites nos quais você pretende publicar nossas URLs. Aguarde entre 2 e 3 semanas para receber uma resposta.

                    Organizações aprovadas poderão publicar links para nosso Site das seguintes formas:

                    Usando nosso nome corporativo; ou
                    Usando a URL para onde o link redireciona; ou
                    Usando qualquer outra descrição do nosso Site que faça sentido dentro do contexto e do formato do conteúdo onde o link está sendo inserido.
                    Não será permitido o uso ou a publicação de links para o logo e/ou outros elementos visuais da Pay pagamentos sem um acordo de licença para o uso da marca registrada.

                    Responsabilização pelo Conteúdo:
                    Não seremos responsabilizados legalmente por qualquer conteúdo que apareça no seu Site. Você concorda em nos proteger e nos defender contra todas as acusações que forem levantadas no seu Site. Nenhum link deve aparecer em qualquer Site que possa ser interpretado como difamatório, obsceno, criminoso, ou que infrinja, viole ou defenda a violação dos direitos de terceiros.
                </Text>
                <Text style={styles.term}>
                    Reserva de Direitos:
                    Reservamos nosso direito de solicitar que você remova todos os links ou quaisquer links que redirecionem para nosso site. Você concorda em remover imediatamente todos os links para nosso site assim que a remoção for solicitada. Também reservamos nosso direito de corrigir e alterar estes termos e condições a qualquer momento. Ao publicar continuadamente links para nosso site, você concorda a seguir estes termos e condições sobre links.

                    Remoção de links postados em nosso site:
                    Se você encontrar qualquer link em nosso Site que seja de qualquer forma ofensivo, você tem a liberdade de entrar em contato conosco e nos informar do problema a qualquer momento. Vamos considerar as solicitações de remoção de links, mas não somos obrigados a remover quaisquer links do nosso site nem a responder diretamente à sua solicitação.

                    Nós não garantimos que as informações continas neste site são corretas. Nós não garantimos integralidade ou exatidão do conteúdo. Não garantimos que o site se manterá disponível ou que o material do site se manterá atualizado.

                    Declaração de Isenção de Responsabilidade:
                    No máximo possível permitido por lei, nós excluímos todas as representações, garantias e condições relativas ao nosso site e ao uso deste site. Nada nesta declaração de isenção de responsabilidade vai:

                    limitar ou excluir nossa responsabilidade ou sua responsabilidade por mortes ou danos pessoais;
                    limitar ou excluir nossa responsabilidade ou sua responsabilidade por fraudes ou deturpações fraudulentas;
                    limitar nossa responsabilidade ou sua responsabilidade de quaisquer maneiras que não forem permitidas sob a lei;
                    excluir quaisquer responsabilidades suas ou nossas que não podem ser excluídas de acordo com a lei aplicável.
                    As limitações e proibições de responsabilização listadas nesta Seção e em outras partes desta declaração: (a) estão sujeitas ao parágrafo anterior; e (b) regem todas as responsabilizações que surgirem sob a declaração, incluindo responsabilizações surgidas em contrato, em delitos e em quebra de obrigações legais.

                    Enquanto o site e as informações e serviços do site forem oferecidos gratuitamente, nós não seremos responsáveis por perdas e danos de qualquer natureza.
                </Text>
                <View style={styles.selection}>
                    <Text style={styles.switchText}>Aceite os termos</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={isEnabled ? "#14d945" : "red"}
                        ios_backgroundColor="#3e3e3e"
                        value={isEnabled}
                        onValueChange={toggleSwitch}

                    />
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={navigateForPaymentDay}>
                        <Text style={styles.textButton}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={addRegistration}>
                        <Text style={styles.textButton}>Finalizar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffdd',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    term: {
        justifyContent: 'flex-start',
        paddingTop: 15,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 20,
    },
    selection: {
        flex: 1,
        flexDirection: 'row',
    },
    switchText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 10,
    },
    containerButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 5,

    },
    button: {
        width: '40%',
        height: 60,
        backgroundColor: '#118CD9',
        elevation: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 15,

    },
    textButton: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',

    },
});