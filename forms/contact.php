<?php
  // Define o endereço de email que irá receber as mensagens do formulário
  $receiving_email_address = 'comercial@perfectus.co.mz';

  // Verifica se a biblioteca PHP Email Form existe e inclui o arquivo
  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    // Se não encontrar a biblioteca, exibe erro e encerra
    die( 'Não foi possível carregar a biblioteca "PHP Email Form"!');
  }

  // Cria uma nova instância do formulário de email
  $contact = new PHP_Email_Form;
  $contact->ajax = true; // Habilita resposta AJAX
  
  // Define os dados do email a ser enviado
  $contact->to = $receiving_email_address; // Destinatário
  $contact->from_name = $_POST['name'];    // Nome do remetente (campo do formulário)
  $contact->from_email = $_POST['email'];  // Email do remetente (campo do formulário)
  $contact->subject = $_POST['subject'];   // Assunto (campo do formulário)

  // Se quiser usar SMTP para enviar emails, descomente e preencha os dados abaixo
  /*
  $contact->smtp = array(
    'host' => 'example.com',      // Endereço do servidor SMTP
    'username' => 'example',      // Usuário SMTP
    'password' => 'pass',         // Senha SMTP
    'port' => '587'               // Porta SMTP
  );
  */

  // Adiciona as mensagens do formulário ao corpo do email
  $contact->add_message( $_POST['name'], 'De');         // Nome do remetente
  $contact->add_message( $_POST['email'], 'Email');     // Email do remetente
  $contact->add_message( $_POST['message'], 'Mensagem', 10); // Mensagem (mínimo 10 caracteres)

  // Envia o email e exibe o resultado (sucesso ou erro)
  echo $contact->send();
?>
